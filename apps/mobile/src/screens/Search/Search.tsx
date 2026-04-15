import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Linking,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../components/Button/Button';
import { FilterPanel } from './components/FilterPanel/FilterPanel';
import { QuickFilters } from './components/QuickFilters/QuickFilters';
import { styles } from './Search.styles';
import { useSearch } from './hooks/useSearch';
import type { SearchResult, SearchScreenProps } from './types';

export function SearchScreen({ onBack, onOpenDetail }: SearchScreenProps) {
  const {
    query,
    setQuery,
    loading,
    loadingMore,
    loadMore,
    error,
    filteredResults,
    results,
    domainOptions,
    tagOptions,
    selectedDomain,
    setSelectedDomain,
    selectedTag,
    setSelectedTag,
    selectedDate,
    setSelectedDate,
    selectedRead,
    setSelectedRead,
    hasActiveFilters,
    clearFilters,
  } = useSearch();

  const insets = useSafeAreaInsets();
  const [showFilterPanel, setShowFilterPanel] = React.useState(false);
  const [pillsBottom, setPillsBottom] = React.useState(0);

  const activeData = query.trim() ? filteredResults : results;

  const handleQuickFilter = (id: string) => {
    if (id === 'all') {
      setSelectedRead('all');
      setSelectedDate('all');
    } else if (id === 'unread') {
      setSelectedRead('unread');
      setSelectedDate('all');
    } else if (id === 'new') {
      setSelectedRead('all');
      setSelectedDate('7d');
    }
  };

  const activeQuickFilter =
    selectedRead === 'unread' ? 'unread' : selectedDate === '7d' ? 'new' : 'all';

  const renderEmpty = () => {
    if (loading)
      return (
        <View style={styles.emptyState}>
          <ActivityIndicator />
          <Text style={styles.emptyTitle}>Cargando recursos...</Text>
        </View>
      );

    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>
          {hasActiveFilters ? 'No hay resultados con esos filtros' : 'No tienes recursos guardados'}
        </Text>
        <Text style={styles.emptySubtitle}>
          {hasActiveFilters
            ? 'Prueba a limpiar o combinar otros filtros.'
            : 'Guarda tu primer enlace para verlo aquí.'}
        </Text>
      </View>
    );
  };

  const renderItem = ({ item }: { item: SearchResult }) => (
    <View style={styles.resultCard}>
      <Text style={styles.resultTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.resultMeta}>{item.domain}</Text>
      <Text style={styles.resultSnippet} numberOfLines={2}>
        {item.snippet}
      </Text>
      <View style={styles.resultActions}>
        <View style={styles.actionButton}>
          <Button label="Ver detalle" onPress={() => onOpenDetail(item.id)} />
        </View>
        <View style={styles.actionButton}>
          <Button
            label="Abrir URL"
            variant="secondary"
            onPress={() => {
              if (item.url) void Linking.openURL(item.url);
            }}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.panel}>
      <ImageBackground
        source={require('../../../assets/search-top-drop-gradient.webp')}
        style={{
          position: 'absolute',
          top: -insets.top,
          left: 0,
          right: 0,
          height: 300 + insets.top,
        }}
        resizeMode="cover"
      />

      <View style={styles.inner}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>De vuelta {'\n'}a lo que importa</Text>
        </View>
        <TextInput
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
          placeholder="Busca en tus recursos..."
          placeholderTextColor="#8B8179"
          returnKeyType="search"
        />
      </View>

      <QuickFilters
        activeQuickFilter={activeQuickFilter}
        hasActiveFilters={hasActiveFilters}
        showFilterPanel={showFilterPanel}
        onQuickFilter={handleQuickFilter}
        onToggleFilterPanel={() => setShowFilterPanel((v) => !v)}
        onLayout={(y, height) => setPillsBottom(y + height)}
      />

      <View style={styles.inner}>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Text style={styles.resultsCounter}>
          {activeData.length} resultados
          {hasActiveFilters ? ` · filtros activos` : ''}
        </Text>
      </View>

      <FlatList
        data={activeData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={
          activeData.length === 0 ? styles.listEmptyContent : styles.listContent
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={loadingMore ? <ActivityIndicator style={{ padding: 16 }} /> : null}
        keyboardShouldPersistTaps="handled"
      />

      {showFilterPanel && (
        <View style={[styles.filterPanel, { top: pillsBottom + 8 }]}>
          <FilterPanel
            domains={domainOptions}
            tags={tagOptions}
            selectedDomain={selectedDomain}
            selectedTag={selectedTag}
            selectedDate={selectedDate}
            selectedRead={selectedRead}
            onSelectDomain={setSelectedDomain}
            onSelectTag={setSelectedTag}
            onSelectDate={setSelectedDate}
            onSelectRead={setSelectedRead}
            onClear={clearFilters}
          />
        </View>
      )}
    </View>
  );
}
