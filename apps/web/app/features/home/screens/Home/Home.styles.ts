import { colors } from '../../../../theme/colors'
import { fonts } from '../../../../theme/fonts'

export const homeStyles = {
  page: {
    minHeight: '100%',
    width: '100%',
    maxWidth: '980px',
    margin: '0 auto',
    padding: 'clamp(8px, 2vw, 16px)'
  },
  header: {
    display: 'grid',
    gap: '8px',
    marginBottom: '12px'
  },
  headerTopRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px'
  },
  headerTitle: {
    margin: 0,
    color: colors.brown,
    fontFamily: fonts.family.primary,
    fontSize: fonts.size.xl,
    fontWeight: fonts.weight.bold
  },
  headerSubtitle: {
    margin: 0,
    color: colors.brownMid,
    fontFamily: fonts.family.primary,
    fontSize: fonts.size.sm,
    lineHeight: fonts.lineHeight.normal
  },
  signOutButton: {
    minHeight: '40px',
    padding: '0 14px',
    border: `1px solid ${colors.brown}35`,
    borderRadius: '10px',
    backgroundColor: colors.white,
    color: colors.brown,
    fontFamily: fonts.family.primary,
    fontWeight: fonts.weight.semibold,
    fontSize: fonts.size.sm,
    cursor: 'pointer'
  },
  list: {
    display: 'grid',
    gap: '10px'
  },
  resourceCard: {
    borderRadius: '14px',
    border: `1px solid ${colors.brown}20`,
    backgroundColor: colors.white,
    boxShadow: '0 10px 24px rgba(67, 40, 28, 0.08)',
    padding: '14px'
  },
  resourceTitle: {
    margin: 0,
    color: colors.brown,
    fontFamily: fonts.family.primary,
    fontSize: fonts.size.lg,
    fontWeight: fonts.weight.semibold,
    lineHeight: fonts.lineHeight.tight
  },
  resourceMeta: {
    margin: '6px 0 0',
    color: colors.brownMid,
    fontFamily: fonts.family.primary,
    fontSize: fonts.size.xs
  },
  resourceSnippet: {
    margin: '10px 0 0',
    color: colors.black,
    fontFamily: fonts.family.primary,
    fontSize: fonts.size.sm,
    lineHeight: fonts.lineHeight.normal,
    wordBreak: 'break-word' as const
  },
  statusBadge: {
    display: 'inline-flex',
    marginTop: '10px',
    padding: '4px 8px',
    borderRadius: '999px',
    backgroundColor: `${colors.salmon}20`,
    color: colors.brown,
    fontFamily: fonts.family.primary,
    fontSize: fonts.size.xs,
    fontWeight: fonts.weight.medium
  },
  skeletonCard: {
    borderRadius: '14px',
    border: `1px solid ${colors.brown}18`,
    backgroundColor: colors.white,
    padding: '14px',
    display: 'grid',
    gap: '8px'
  },
  skeletonLine: {
    height: '12px',
    borderRadius: '8px',
    background: 'linear-gradient(90deg, #efe8e2 0%, #f8f3ef 50%, #efe8e2 100%)',
    backgroundSize: '200% 100%',
    animation: 'skeletonPulse 1.2s ease-in-out infinite'
  },
  skeletonLineShort: {
    width: '45%'
  },
  skeletonLineLong: {
    width: '85%'
  },
  skeletonLineMedium: {
    width: '65%'
  },
  bottomArea: {
    marginTop: '12px',
    display: 'grid',
    gap: '8px'
  },
  loadMoreButton: {
    width: '100%',
    minHeight: '44px',
    borderRadius: '12px',
    border: `1px solid ${colors.brown}32`,
    backgroundColor: colors.white,
    color: colors.brown,
    fontFamily: fonts.family.primary,
    fontSize: fonts.size.sm,
    fontWeight: fonts.weight.semibold,
    cursor: 'pointer'
  },
  observerSentinel: {
    width: '100%',
    height: '1px'
  },
  emptyState: {
    borderRadius: '14px',
    border: `1px solid ${colors.brown}20`,
    backgroundColor: colors.white,
    padding: '16px'
  },
  emptyTitle: {
    margin: 0,
    color: colors.brown,
    fontFamily: fonts.family.primary,
    fontSize: fonts.size.lg,
    fontWeight: fonts.weight.semibold
  },
  emptyText: {
    margin: '8px 0 0',
    color: colors.brownMid,
    fontFamily: fonts.family.primary,
    fontSize: fonts.size.sm,
    lineHeight: fonts.lineHeight.normal
  },
  errorText: {
    margin: 0,
    color: '#8b2a1b',
    fontFamily: fonts.family.primary,
    fontSize: fonts.size.sm
  },
  loading: {
    color: colors.brown,
    fontFamily: fonts.family.primary,
    fontSize: fonts.size.md
  }
}
