import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.background,
    paddingTop: 12,
    paddingBottom: 8,
    shadowColor: colors.salmon,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    zIndex: 10,
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
    width: 60,
  },
  navIconPlaceholder: {
    fontSize: 20,
    color: colors.brownMid,
    marginBottom: 2,
  },
  navLabel: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 12,
    color: colors.brownMid,
    letterSpacing: 0.28,
  },
  navLabelActive: {
    color: colors.salmon,
  },
  navFab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.brownMid,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 6,
  },
  navFabIcon: {
    fontSize: 24,
    color: colors.white,
    lineHeight: 28,
  },
});
