import { StyleSheet } from 'react-native';
import { colors } from '@theme/colors';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Header
  header: {
    alignItems: 'center',
    paddingBottom: 32,
    paddingHorizontal: 20,
    backgroundColor: colors.salmon ?? '#fdf0ed',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: colors.background,
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  userName: {
    fontFamily: 'CabinetGrotesk-Bold',
    fontSize: 28,
    color: colors.brown,
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: colors.brown,
    opacity: 0.7,
    letterSpacing: 0.4,
  },

  // Sections
  sectionsBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 250,
    marginHorizontal: 20,
    overflow: 'hidden',
    borderRadius: 20,
  },
  sections: {
    paddingHorizontal: 40,
    paddingTop: 30,
    gap: 24,
    paddingBottom: 40,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 18,
    color: colors.brown,
    marginBottom: 4,
  },
  sectionCard: {
    backgroundColor: colors.white ?? '#fff',
    borderRadius: 16,
    overflow: 'hidden',
  },

  // Menu item
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(249,111,93,0.09)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconDanger: {
    backgroundColor: 'rgba(249,111,93,0.09)',
  },
  menuIconText: {
    fontSize: 18,
  },
  menuLabel: {
    flex: 1,
    fontFamily: 'Satoshi-Regular',
    fontSize: 18,
    color: colors.brown,
  },
  menuLabelDanger: {
    color: colors.salmon,
  },
  menuChevron: {
    fontSize: 22,
    color: colors.brown,
    opacity: 0.4,
  },
  separator: {
    height: 1,
    backgroundColor: colors.background,
    marginHorizontal: 16,
  },
});
