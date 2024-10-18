import { Direction, IConfig, ITheme, ThemeID } from '@oxygen/types';

const getLightTheme = (direction: Direction): ITheme => {
  return {
    id: ThemeID.LIGHT,
    direction: direction,
    primary: {
      main: '#4958df',
      _50: '#eef2ff',
      _100: '#e1e7f8',
      _200: '#c7d2fe',
      _300: '#a5b4fc',
      _400: '#818cf8',
      _500: '#6366F1',
      _600: '#4f46e5',
      _700: '#4338ca',
      _800: '#3730a3',
      _900: '#1f2366',
    },
    secondary: {
      main: '#0d9488',
      _50: '#f0fdfa',
      _100: '#ccfbf1',
      _200: '#99f6e4',
      _300: '#5eead4',
      _400: '#2dd4bf',
      _500: '#14b8a6',
      _600: '#0d9488',
      _700: '#0f766e',
      _800: '#115e59',
      _900: '#134e4a',
    },
    background: {
      main: '#ffffff',
      _50: '#f8fafc',
      _100: '#f1f5f9',
      _200: '#e2e8f0',
      _600: '#475569',
    },
    surface: '#ffffff',
    onPrimary: '#ffffff',
    cardColor: '#fafafa',
    success: {
      main: '#16A34A',
      _50: '#F0FDF4',
      _100: '#DCFCE7',
      _300: '#86EFAC',
      _500: '#22C55E',
      _600: '#16A34A',
    },
    error: {
      main: '#DC2626',
      _50: '#FEF2F2',
      _100: '#FEE2E2',
      _300: '#FCA5A5',
      _500: '#EF4444',
      _600: '#DC2626',
    },
    warning: {
      main: '#D97706',
      _50: '#FFFBEB',
      _100: '#FEF3C7',
      _300: '#FCD34D',
      _500: '#F59E0B',
      _600: '#D97706',
    },
    info: {
      main: '#0958d9',
      _50: '#e6f4ff',
      _100: '#91caff',
      _300: '#69b1ff',
      _500: '#4096ff',
      _600: '#0958d9',
    },
    lightGray: '#fafafa',
    iconPrimary: '#7e828a',
    text: {
      primary: '#0F172A',
      secondary: '#334155',
      territory: '#475569',
      quaternary: '#64748B',
    },
    divider: '#d9d9d9',
    border: {
      main: '#94A3B8',
      _50: '#F1F5F9',
      _100: '#E2E8F0',
      _300: '#CBD5E1',
      _500: '#94A3B8',
      _600: '#64748B',
    },
    appbar: '#30398b',
  };
};

const getDarkTheme = (direction: Direction): ITheme => {
  return {
    id: ThemeID.DARK,
    direction: direction,
    primary: {
      main: '#8c9eff',
      _50: '#1c1f3a',
      _100: '#292d52',
      _200: '#333975',
      _300: '#4c4fb1',
      _400: '#6366f1',
      _500: '#7c83ff',
      _600: '#949cf8',
      _700: '#a5b4fc',
      _800: '#c7d2fe',
      _900: '#eef2ff',
    },
    secondary: {
      main: '#26c2b7',
      _50: '#0a1f1e',
      _100: '#0d3332',
      _200: '#11514d',
      _300: '#177d78',
      _400: '#14b8a6',
      _500: '#2dd4bf',
      _600: '#4ce3d5',
      _700: '#99f6e4',
      _800: '#ccfbf1',
      _900: '#f0fdfa',
    },
    background: {
      main: '#0f172a',
      _50: '#1e293b',
      _100: '#2c3e57',
      _200: '#3a4f6e',
      _600: '#94a3b8',
    },
    surface: '#1e293b',
    onPrimary: '#ffffff',
    cardColor: '#1c1f3a',
    success: {
      main: '#22c55e',
      _50: '#052c1d',
      _100: '#064e32',
      _300: '#0b8554',
      _500: '#16a34a',
      _600: '#22c55e',
    },
    error: {
      main: '#f87171',
      _50: '#3e0707',
      _100: '#7f1d1d',
      _300: '#b91c1c',
      _500: '#ef4444',
      _600: '#f87171',
    },
    warning: {
      main: '#f59e0b',
      _50: '#4e3100',
      _100: '#7b3b00',
      _300: '#b45309',
      _500: '#f59e0b',
      _600: '#fcd34d',
    },
    info: {
      main: '#69b1ff',
      _50: '#0a0f1f',
      _100: '#122444',
      _300: '#16468a',
      _500: '#4096ff',
      _600: '#69b1ff',
    },
    lightGray: '#2c3e57',
    iconPrimary: '#a0aec0',
    text: {
      primary: '#f8fafc',
      secondary: '#e2e8f0',
      territory: '#cbd5e1',
      quaternary: '#94a3b8',
    },
    divider: '#4b5563',
    border: {
      main: '#64748b',
      _50: '#3e4a5c',
      _100: '#4b5563',
      _300: '#6b7280',
      _500: '#9ca3af',
      _600: '#e5e7eb',
    },
    appbar: '#1f2366',
  };
};

export const getTheme = (config: IConfig) => {
  switch (config.themeId) {
    case ThemeID.DARK:
      return getDarkTheme(config.direction);
    case ThemeID.LIGHT:
    default:
      return getLightTheme(config.direction);
  }
};

// export default getTheme;
