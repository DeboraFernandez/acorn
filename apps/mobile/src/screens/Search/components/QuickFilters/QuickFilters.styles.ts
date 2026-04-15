import { StyleSheet } from 'react-native';
import { colors } from '../../../../theme/colors';

export const styles = StyleSheet.create({
  pillsRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  pillFilter: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: `${colors.brown}20`,
  },
  pillFilterActive: {
    backgroundColor: '#3A3A3A',
    borderColor: '#3A3A3A',
  },
  pillFilterLabel: {
    color: colors.brownMid,
    fontSize: 13,
    fontWeight: '500',
  },
  pillFilterLabelActive: {
    color: '#FFFFFF',
  },
  pill: {
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  pillActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  pillLabel: {
    color: '#8B8179',
    fontSize: 13,
    fontWeight: '500',
  },
  pillLabelActive: {
    color: '#000000',
  },
});
