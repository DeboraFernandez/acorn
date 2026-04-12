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
import { styles } from './Search.styles';

type SearchResult = {
  id: string;
  title: string;
  domain: string;
  snippet: string;
  url: string;
};

type SearchRow = {
  id: string;
  title: string | null;
  description: string | null;
  domain: string | null;
  url: string | null;
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
  };
}

export function SearchScreen({ visible, onClose, onOpenDetail }: SearchScreenProps) {
  const [query, setQuery] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [results, setResults] = React.useState<SearchResult[]>([]);

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
      .select('id,title,description,domain,url')
      .eq('user_id', user.id)
      .or(
        `title.ilike.${termPattern},description.ilike.${termPattern},domain.ilike.${termPattern},url.ilike.${termPattern}`,
      )
      .order('created_at', { ascending: false })
      .limit(40);

    setLoading(false);

    if (searchError) {
      setError('No se pudieron cargar los resultados. Intenta de nuevo.');
      return;
    }

    setResults(((data ?? []) as SearchRow[]).map(mapSearchResult));
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
    }
  }, [visible]);

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
        <Text style={styles.emptyTitle}>No hay coincidencias</Text>
        <Text style={styles.emptySubtitle}>Prueba con otra palabra clave.</Text>
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

              <FlatList
                data={results}
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
                contentContainerStyle={results.length === 0 ? styles.listEmptyContent : styles.listContent}
                keyboardShouldPersistTaps='handled'
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
