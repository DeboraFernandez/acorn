import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './FoldersScreen.styles';
import { FolderCard } from './components/FolderCard/FolderCard';
import { NewFolderModal } from './components/NewFolderModal/NewFolderModal';
import { colors } from '../../theme/colors';
import type { FolderData } from './FoldersScreen.types';

type FoldersScreenProps = {
  folders: FolderData[];
  loading: boolean;
  refreshing: boolean;
  error: string;
  builderOpen: boolean;
  onNewFolder: () => void;
  onBuilderClose: () => void;
  onBuilderCreated: () => void;
  onFolderOptions: (id: string) => void;
  onFolderPress: (id: string) => void;
  onRefresh: () => void;
};

export function FoldersScreen({
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
}: FoldersScreenProps) {
  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.emptyState}>
          <ActivityIndicator color={colors.salmon} />
          <Text style={styles.emptyTitle}>Cargando carpetas...</Text>
        </View>
      );
    }
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>Todavía no tienes carpetas</Text>
        <Text style={styles.emptySubtitle}>
          Crea tu primera carpeta para organizar tus recursos.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <FlatList
        data={folders}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          folders.length === 0 && styles.scrollContentEmpty,
        ]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={
          <>
            <Image
              source={require('@assets/search-top-drop-gradient.webp')}
              style={styles.topGradient}
              resizeMode="stretch"
            />
            <View style={styles.heroContainer}>
              <Text style={styles.heroTitle}>{'Orden\nsin esfuerzo'}</Text>
              <TouchableOpacity onPress={onNewFolder} activeOpacity={0.7}>
                <Text style={styles.newFolderLink}>+ Nueva carpeta</Text>
              </TouchableOpacity>
            </View>
            {folders.length > 0 && <Text style={styles.sectionTitle}>Mis carpetas</Text>}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </>
        }
        renderItem={({ item }) => (
          <FolderCard
            {...item}
            onPress={() => onFolderPress(item.id)}
            onOptions={() => onFolderOptions(item.id)}
          />
        )}
        ListEmptyComponent={renderEmpty}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <NewFolderModal visible={builderOpen} onClose={onBuilderClose} onCreated={onBuilderCreated} />
    </SafeAreaView>
  );
}
