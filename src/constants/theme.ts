export const COLORS = {
  primary: '#5E4AE3',
  primaryDark: '#4937B8',
  primaryLight: '#7C6CF5',
  primarySoft: '#F0EEFD',
  primaryGradient: ['#6C5CE7', '#5E4AE3'] as const,
  primaryPurpleBanner: ['#6C5CE7', '#533DC6'] as const,

  // Accents
  mint: '#00B894',
  mintLight: '#E6F9F5',
  mintText: '#00A382',

  blue: '#0984E3',
  blueLight: '#EBF4FE',
  blueText: '#0873C4',

  orange: '#FF9F43',
  orangeLight: '#FFF4E8',
  orangeText: '#E67E22',

  red: '#FF4757',
  redLight: '#FFEAEB',

  // Backgrounds & Surfaces
  background: '#F9F8FD',
  cardBg: '#FFFFFF',
  cardBorder: 'rgba(94, 74, 227, 0.08)',
  divider: '#F0EFF6',

  // Pastel Blobs
  blobPink: 'rgba(255, 182, 193, 0.4)',
  blobLavender: 'rgba(108, 92, 231, 0.18)',
  blobSky: 'rgba(116, 185, 255, 0.35)',
  blobPeach: 'rgba(255, 230, 210, 0.5)',

  // Typography
  textPrimary: '#1E1B2E',
  textSecondary: '#7A7593',
  textMuted: '#A59FB9',
  white: '#FFFFFF',
};

export const SHADOWS = {
  card: {
    shadowColor: '#5E4AE3',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 3,
  },
  cardHover: {
    shadowColor: '#5E4AE3',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 6,
  },
  floatingBar: {
    shadowColor: '#1E1B2E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 12,
  },
  tag: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  button: {
    shadowColor: '#5E4AE3',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 5,
  },
};

export const RADIUS = {
  small: 12,
  medium: 16,
  card: 24,
  large: 28,
  pill: 999,
};
