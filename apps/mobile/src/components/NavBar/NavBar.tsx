import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './NavBar.styles';
import HomeIcon from '../../../assets/icons/home.svg';
import SearchIcon from '../../../assets/icons/search-icon.svg';
import FolderIcon from '../../../assets/icons/folder-icon.svg';
import FabIcon from '../../../assets/icons/fab-icon.svg';
import ProfileIcon from '../../../assets/icons/profile-icon.svg';
import NavbarBg from '../../../assets/svg/navbar-bg.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';

type NavBarProps = {
  onHomePress: () => void;
  onAddPress: () => void;
  onSearchPress: () => void;
  onTagsPress: () => void;
  onProfilePress: () => void;
  homeActive: boolean;
  searchActive: boolean;
  tagsActive: boolean;
  profileActive: boolean;
};

export function NavBar({
  onHomePress,
  onAddPress,
  onSearchPress,
  onTagsPress,
  onProfilePress,
  homeActive,
  searchActive,
  tagsActive,
  profileActive,
}: NavBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.navbar, { paddingBottom: insets.bottom }]}>
      <NavbarBg style={styles.navbarBg} />
      <View style={styles.innerBar}>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={onHomePress}>
          <HomeIcon width={24} height={24} color={homeActive ? colors.salmon : colors.brownMid} />
          <Text style={[styles.navLabel, homeActive ? styles.navLabelActive : null]}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={onSearchPress}>
          <SearchIcon width={24} height={24} color={searchActive ? colors.salmon : colors.brownMid} />
          <Text style={[styles.navLabel, searchActive ? styles.navLabelActive : null]}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navFab} activeOpacity={0.8} onPress={onAddPress}>
          <FabIcon width={32} height={32} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={onTagsPress}>
          <FolderIcon width={20} height={20} color={tagsActive ? colors.salmon : colors.brownMid} />
          <Text style={[styles.navLabel, tagsActive ? styles.navLabelActive : null]}>Carpetas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={onProfilePress}>
          <ProfileIcon width={20} height={20} color={profileActive ? colors.salmon : colors.brownMid} />
          <Text style={[styles.navLabel, profileActive ? styles.navLabelActive : null]}>
            Perfil
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
