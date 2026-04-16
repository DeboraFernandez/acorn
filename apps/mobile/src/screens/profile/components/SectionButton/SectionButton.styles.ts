import { StyleSheet } from 'react-native';
import { colors } from '@theme/colors';

export const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: colors.white ?? '#fff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  sectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderRadius: 21,
    backgroundColor: colors.salmon,
  },
  label: {
    fontSize: 16,
    color: colors.text ?? '#1a1a1a',
  },
  separator: {
    height: 1,
    backgroundColor: colors.border ?? '#f0f0f0',
    marginHorizontal: 16,
  },
});
