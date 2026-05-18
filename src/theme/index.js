/** Design system — mockups Produtividade / TaskFlow */

export const colors = {
  bg: '#F7F7F7',
  surface: '#FFFFFF',
  surfaceMuted: '#F3F4F6',
  border: '#E5E7EB',
  text: '#000000',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textInverse: '#FFFFFF',
  primary: '#000000',
  accentBlue: '#D6E4FF',
  accentBlueIcon: '#4F6BF5',
  navy: '#1A1C1E',
  link: '#6B7280',
  danger: '#DC2626',
  shadow: 'rgba(0, 0, 0, 0.06)',
  statusPendingBg: '#E8EDF5',
  statusDefaultBg: '#FFFFFF',
  priorityActiveBg: '#F3F4F6',
};

export const fonts = {
  serif: 'PlayfairDisplay_700Bold',
  sans: 'DMSans_400Regular',
  sansMedium: 'DMSans_500Medium',
  sansSemiBold: 'DMSans_600SemiBold',
  sansBold: 'DMSans_700Bold',
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
};

export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
};

export const typography = {
  brandLogin: {
    fontFamily: fonts.serif,
    fontSize: 32,
    color: colors.text,
    letterSpacing: -0.5,
  },
  brandApp: {
    fontFamily: fonts.serif,
    fontSize: 22,
    color: colors.text,
    letterSpacing: -0.3,
  },
  display: {
    fontFamily: fonts.serif,
    fontSize: 36,
    color: colors.text,
    letterSpacing: -0.5,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 26,
    color: colors.text,
    letterSpacing: -0.3,
  },
  titleCard: {
    fontFamily: fonts.serif,
    fontSize: 20,
    color: colors.text,
  },
  subtitle: {
    fontFamily: fonts.sans,
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  label: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 14,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  body: {
    fontFamily: fonts.sans,
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
};
