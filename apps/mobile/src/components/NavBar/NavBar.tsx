import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './NavBar.styles';

type NavBarProps = {
  onAddPress: () => void;
  onSearchPress: () => void;
  onTagsPress: () => void;
  onSmartFoldersPress: () => void;
  searchActive: boolean;
  tagsActive: boolean;
  smartFoldersActive: boolean;
};

export function NavBar({
  onAddPress,
  onSearchPress,
  onTagsPress,
  onSmartFoldersPress,
  searchActive,
  tagsActive,
  smartFoldersActive,
}: NavBarProps) {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
        <Text style={styles.navIconPlaceholder}>⌂</Text>
        <Text style={[styles.navLabel, styles.navLabelActive]}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={onSearchPress}>
        <Text style={styles.navIconPlaceholder}>⌕</Text>
        <Text style={[styles.navLabel, searchActive ? styles.navLabelActive : null]}>Buscar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navFab} activeOpacity={0.8} onPress={onAddPress}>
        <Text style={styles.navFabIcon}>＋</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={onTagsPress}>
        <Text style={styles.navIconPlaceholder}>⊟</Text>
        <Text style={[styles.navLabel, tagsActive ? styles.navLabelActive : null]}>Etiquetas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={onSmartFoldersPress}>
        <Text style={styles.navIconPlaceholder}>◯</Text>
        <Text style={[styles.navLabel, smartFoldersActive ? styles.navLabelActive : null]}>
          Carpetas IA
        </Text>
      </TouchableOpacity>
    </View>
  );
}
