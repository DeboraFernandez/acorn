import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@lib/supabase';
import type { FolderData } from '../FoldersScreen.types';

type SmartFolderRow = {
  id: string;
  name: string | null;
  created_at: string;
};

function mapFolder(row: SmartFolderRow): FolderData {
  return {
    id: row.id,
    name: row.name?.trim() || 'Carpeta sin nombre',
    subtitle: new Date(row.created_at).toLocaleDateString(),
  };
}

export function useFolders() {
  const [folders, setFolders] = useState<FolderData[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [builderOpen, setBuilderOpen] = useState(false);

  const fetchFolders = useCallback(async (mode: 'initial' | 'refresh') => {
    if (mode === 'initial') setLoading(true);
    if (mode === 'refresh') setRefreshing(true);

    setError('');

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      setRefreshing(false);
      setError('Debes iniciar sesion para ver tus carpetas.');
      return;
    }

    const { data, error: queryError } = await supabase
      .from('smart_folders')
      .select('id, name, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setLoading(false);
    setRefreshing(false);

    if (queryError) {
      setError('No se pudieron cargar tus carpetas.');
      return;
    }

    setFolders(((data ?? []) as SmartFolderRow[]).map(mapFolder));
  }, []);

  useEffect(() => {
    void fetchFolders('initial');
  }, [fetchFolders]);

  const onNewFolder = () => setBuilderOpen(true);

  const onBuilderClose = () => setBuilderOpen(false);

  const onBuilderCreated = () => {
    setBuilderOpen(false);
    void fetchFolders('refresh');
  };

  const onFolderOptions = (_id: string) => {
    // TODO: abrir bottom sheet de opciones
  };

  const onFolderPress = (_id: string) => {
    // TODO: navegar al detalle de la carpeta
  };

  const onRefresh = () => void fetchFolders('refresh');

  return {
    folders,
    loading,
    refreshing,
    error,
    builderOpen,
    onNewFolder,
    onBuilderClose,
    onBuilderCreated,
    onFolderOptions,
    onFolderPress,
    onRefresh,
  };
}
