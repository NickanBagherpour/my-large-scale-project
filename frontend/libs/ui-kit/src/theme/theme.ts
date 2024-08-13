import { Direction, IConfig, ITheme, ThemeID } from '@oxygen-portal/types';

const getLightTheme = (direction: Direction): ITheme => {
  return {
    base: {
      id: ThemeID.LIGHT,
      direction: direction,
      primary: '#2563EB',
      primaryDark: '#1E3A8A',
      primaryLight: '#EFF6FF',
      // primaryLightest: '#f4f8fc',
      secondary: '#94A3B8',
      background: '#F1F5F9',
      surface: '#fff',
      onPrimary: '#fff',
      // disable: 30% textPrimary
      success: '#16A34A',
      successBackground: '#4CAF50',
      successBackgroundLight: '#DCFCE7',
      error: '#DC2626',
      errorBackground: '#EF5350',
      errorBackgroundLight: '#FEE2E2',
      info: '#1E40AF',
      infoBackground: '#03A9F4',
      infoBackgroundLight: '#eef3fd',
      warning: '#D97706',
      warningBackground: '#FF9800',
      warningBackgroundLight: '#FFFBEB',
      lightGray: '#fafafa',
      iconPrimary: '#0F172A',
      textPrimary: '#0F172A',
      textSecondary: '#334155',
      textPrimaryDark: '#000000',
      hint: '#64748B',
      drawer: '#fff',
      border: '#CBD5E1',
      borderLight: '#F1F5F9',
      orange: '#FAA627',
    },
  };
};

const getDarkTheme = (direction: Direction): ITheme => {
  return {
    base: {
      id: ThemeID.DARK,
      direction: direction,
      primary: '#1a1a2e',
      primaryDark: '#1E3A8A',
      primaryLight: '#222238',
      // primaryLightest: '#28283b',
      secondary: '#646569',
      background: '#2c3333',
      surface: '#232a2a',
      onPrimary: '#fff',
      success: '#166534',
      successBackground: '#4CAF50',
      successBackgroundLight: '#DCFCE7',
      error: '#DC2626',
      errorBackground: '#EF5350',
      errorBackgroundLight: '#FEE2E2',
      info: '#1E40AF',
      infoBackground: '#03A9F4',
      infoBackgroundLight: '#DBEAFE',
      warning: '#D97706',
      warningBackground: '#FF9800',
      warningBackgroundLight: '#FFFBEB',
      lightGray: '#fafafa',
      iconPrimary: '#f5f2e7',
      textPrimary: '#f5f2e7',
      textSecondary: '#fff',
      textPrimaryDark: '#efeeeb',
      hint: '#a4a9b0',
      drawer: '#646569',
      border: '#dee0e6',
      borderLight: '#646569',
      orange: '#FAA627',
    },
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
