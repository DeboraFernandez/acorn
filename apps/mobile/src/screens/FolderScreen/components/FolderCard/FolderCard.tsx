import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './FolderCard.styles';
import FolderBrownIcon from '@assets/icons/folder-brown-icon.svg';

type FolderCardProps = {
  name: string;
  subtitle: string;
  iconSource?: number;
  onPress: () => void;
  onOptions: () => void;
};

export function FolderCard({ name, subtitle, iconSource, onPress, onOptions }: FolderCardProps) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      {iconSource ? (
        <Image source={iconSource} style={styles.folderIcon} resizeMode="contain" />
      ) : (
        <View style={styles.folderIcon}>
          <FolderBrownIcon width="100%" height="100%" />
        </View>
      )}
      <View style={styles.textBlock}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.menuButton}
        activeOpacity={0.7}
        onPress={onOptions}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.menuIcon}>⋮</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
