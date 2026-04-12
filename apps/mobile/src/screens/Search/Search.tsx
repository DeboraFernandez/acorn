import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { supabase } from '../../../lib/supabase';
import { Button } from '../../components/Button/Button';
import { DateFilterValue, FilterPanel, ReadFilterValue } from '../../components/FilterPanel/FilterPanel';
import { styles } from './Search.styles';

type SearchResult = {
  id: string;
  title: string;
  domain: string;
  snippet: string;
  url: string;
  createdAt: string;
  isRead: boolean;
  tags: string[];
};

type SearchRow = {
  id: string;
  title: string | null;
  description: string | null;
  domain: string | null;
  url: string | null;
  created_at: string;
  is_read: boolean;
  tags: string[] | null;
};

type SearchScreenProps = {
  visible: boolean;
  onClose: () => void;
  onOpenDetail: (itemId: string) => void;
};

function mapSearchResult(row: SearchRow): SearchResult {
  const title = row.title?.trim() || row.domain || row.url || 'Recurso sin titulo';
  const snippet = row.description?.trim() || row.url || 'Sin descripcion';

  return {
    id: row.id,
    title,
    domain: row.domain || 'Dominio no disponible',
    snippet,
    url: row.url || '',
    createdAt: row.created_at,
    isRead: Boolean(row.is_read),
    tags: (row.tags ?? []).filter(Boolean),
  };
}

function applyDateFilter(createdAt: string, filter: DateFilterValue) {
  if (filter === 'all') {
    return true;
  }

  const createdTime = new Date(createdAt).getTime();
  if (Number.isNaN(createdTime)) {
    return false;
  }

  const dayToMs = 24 * 60 * 60 * 1000;
  const now = Date.now();

  if (filter === '7d') {
    return createdTime >= now - 7 * dayToMs;
  }

  if (filter === '30d') {
    return createdTime >= now - 30 * dayToMs;
  }

  return createdTime >= now - 365 * dayToMs;
}

export function SearchScreen({ visible, onClose, onOpenDetail }: SearchScreenProps) {
  const [query, setQuery] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [selectedDomain, setSelectedDomain] = React.useState<string | null>(null);
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<DateFilterValue>('all');
  const [selectedRead, setSelectedRead] = React.useState<ReadFilterValue>('all');

  const runSearch = React.useCallback(async (rawTerm: string) => {
    const term = rawTerm.trim();

    if (!term) {
      setResults([]);
      setError('');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      setError('Debes iniciar sesion para buscar en tus recursos.');
      return;
    }

    const escapedTerm = term.replace(/[%_]/g, '');
    const termPattern = `%${escapedTerm}%`;

    const { data, error: searchError } = await supabase
      .from('items_with_links')
      .select('id,title,description,domain,url,created_at,is_read,tags')
      .eq('user_id', user.id)
      .or(
        `title.ilike.${termPattern},description.ilike.${termPattern},domain.ilike.${termPattern},url.ilike.${termPattern}`,
      )
      .order('created_at', { ascending: false })
      .limit(120);

    setLoading(false);

    if (searchError) {
      setError('No se pudieron cargar los resultados. Intenta de nuevo.');
      return;
    }

    setResults(((data ?? []) as SearchRow[]).map(mapSearchResult));
  }, []);

  const domainOptions = React.useMemo(
    () => Array.from(new Set(results.map((result) => result.domain).filter(Boolean))).slice(0, 20),
    [results],
  );

  const tagOptions = React.useMemo(
    () =>
      Array.from(
        new Set(
          results.flatMap((result) => result.tags.map((tag) => tag.trim()).filter(Boolean)),
        ),
      ).slice(0, 30),
    [results],
  );

  const filteredResults = React.useMemo(
    () =>
      results.filter((result) => {
        if (selectedDomain && result.domain !== selectedDomain) {
          return false;
        }

        if (selectedTag && !result.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase())) {
          return false;
        }

        if (!applyDateFilter(result.createdAt, selectedDate)) {
          return false;
        }

        if (selectedRead === 'read' && !result.isRead) {
          return false;
        }

        if (selectedRead === 'unread' && result.isRead) {
          return false;
        }

        return true;
      }),
    [results, selectedDate, selectedDomain, selectedRead, selectedTag],
  );

  const hasActiveFilters =
    selectedDomain !== null || selectedTag !== null || selectedDate !== 'all' || selectedRead !== 'all';

  const clearFilters = React.useCallback(() => {
    setSelectedDomain(null);
    setSelectedTag(null);
    setSelectedDate('all');
    setSelectedRead('all');
  }, []);

  React.useEffect(() => {
    if (!visible) {
      return;
    }

    const timer = setTimeout(() => {
      void runSearch(query);
    }, 260);

    return () => {
      clearTimeout(timer);
    };
  }, [query, runSearch, visible]);

  React.useEffect(() => {
    if (!visible) {
      setQuery('');
      setError('');
      setResults([]);
      setLoading(false);
      clearFilters();
    }
  }, [clearFilters, visible]);

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.emptyState}>
          <ActivityIndicator />
          <Text style={styles.emptyTitle}>Buscando recursos...</Text>
        </View>
      );
    }

    if (!query.trim()) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Escribe para buscar</Text>
          <Text style={styles.emptySubtitle}>Puedes buscar por titulo, dominio, URL o contenido.</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>{hasActiveFilters ? 'No hay resultados con esos filtros' : 'No hay coincidencias'}</Text>
        <Text style={styles.emptySubtitle}>
          {hasActiveFilters ? 'Prueba a limpiar o combinar otros filtros.' : 'Prueba con otra palabra clave.'}
        </Text>
      </View>
    );
  };

  return (
    <Modal visible={visible} transparent animationType='slide' onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.panel}>
              <View style={styles.headerRow}>
                <Text style={styles.title}>Buscar</Text>
                <TouchableOpacity onPress={onClose} activeOpacity={0.8}>
                  <Text style={styles.closeLabel}>Cerrar</Text>
                </TouchableOpacity>
              </View>

              <TextInput
                value={query}
                onChangeText={setQuery}
                style={styles.searchInput}
                autoFocus
                placeholder='Busca en tus recursos...'
                placeholderTextColor='#8B8179'
                returnKeyType='search'
              />

              {error ? <Text style={styles.error}>{error}</Text> : null}

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

              {query.trim() ? (
                <Text style={styles.resultsCounter}>
                  {filteredResults.length} resultados
                  {hasActiveFilters ? ` (de ${results.length} tras aplicar filtros)` : ''}
                </Text>
              ) : null}

              <FlatList
                data={filteredResults}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
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
                        <Button
                          label='Ver detalle'
                          onPress={() => {
                            onClose();
                            onOpenDetail(item.id);
                          }}
                        />
                      </View>
                      <View style={styles.actionButton}>
                        <Button
                          label='Abrir URL'
                          variant='secondary'
                          onPress={() => {
                            if (item.url) {
                              void Linking.openURL(item.url);
                            }
                          }}
                        />
                      </View>
                    </View>
                  </View>
                )}
                ListEmptyComponent={renderEmpty}
                contentContainerStyle={filteredResults.length === 0 ? styles.listEmptyContent : styles.listContent}
                keyboardShouldPersistTaps='handled'
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
