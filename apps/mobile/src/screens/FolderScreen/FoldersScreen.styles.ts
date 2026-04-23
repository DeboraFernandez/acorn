import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
    paddingHorizontal: 25,
  },
  scrollContentEmpty: {
    flex: 1,
  },

  // ── Gradiente ──
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 220,
    zIndex: 0,
  },

  // ── Hero ──
  heroContainer: {
    paddingTop: 16,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  heroTitle: {
    fontFamily: 'CabinetGrotesk-Bold',
    fontSize: 30,
    color: colors.brown,
    lineHeight: 31,
    fontWeight: '700',
  },
  newFolderLink: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: colors.brown,
    textDecorationLine: 'underline',
    letterSpacing: 0.32,
    marginTop: 4,
  },

  // ── Lista ──
  sectionTitle: {
    fontFamily: 'CabinetGrotesk-Medium',
    fontSize: 20,
    color: colors.brown,
    marginBottom: 16,
    zIndex: 1,
  },
  separator: {
    height: 22,
  },
  errorText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 12,
    color: '#8b2a1b',
    marginBottom: 10,
  },

  // ── Empty ──
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontFamily: 'CabinetGrotesk-Bold',
    fontSize: 22,
    color: colors.brown,
    textAlign: 'center',
    fontWeight: '700',
  },
  emptySubtitle: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 15,
    color: colors.brownMid,
    textAlign: 'center',
  },
});
