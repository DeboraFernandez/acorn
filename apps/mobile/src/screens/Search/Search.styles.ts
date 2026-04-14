import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(27, 27, 27, 0.4)',
    justifyContent: 'flex-end',
  },
  panel: {
    flex: 1,
    maxHeight: '92%', // puedes quitarlo también, ya no es un modal
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontFamily: 'CabinetGrotesk-Bold',
    fontSize: 24,
    color: colors.brown,
  },
  closeLabel: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 14,
    color: colors.salmon,
  },
  searchInput: {
    width: '100%',
    minHeight: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${colors.brown}30`,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: colors.black,
  },
  error: {
    marginTop: 8,
    color: '#8b2a1b',
    fontFamily: 'Satoshi-Regular',
    fontSize: 12,
  },
  resultsCounter: {
    marginTop: 4,
    marginBottom: 6,
    color: colors.brownMid,
    fontFamily: 'Satoshi-Regular',
    fontSize: 12,
  },
  listContent: {
    paddingTop: 12,
    paddingBottom: 4,
    gap: 10,
  },
  listEmptyContent: {
    flexGrow: 1,
    paddingTop: 12,
    justifyContent: 'center',
  },
  resultCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: `${colors.brown}18`,
    paddingVertical: 12,
    paddingHorizontal: 12,
    gap: 6,
  },
  resultTitle: {
    fontFamily: 'CabinetGrotesk-Bold',
    fontSize: 18,
    color: colors.black,
  },
  resultMeta: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 12,
    color: colors.salmon,
  },
  resultSnippet: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 13,
    color: colors.brownMid,
  },
  resultActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  actionButton: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontFamily: 'CabinetGrotesk-Bold',
    fontSize: 22,
    color: colors.black,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: colors.brownMid,
    textAlign: 'center',
  },
});
