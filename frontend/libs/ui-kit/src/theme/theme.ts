import { Direction, IConfig, ITheme, ThemeID } from '@oxygen/types';
const getLightTheme = (direction: Direction): ITheme => {
  return {
    id: ThemeID.LIGHT,
    direction: direction,
    primary: '#30398b',
    primaryDark: '#1f2366',
    primaryLight: '#e1e7f8',
    // secondary: '#646569',
    background: '#f2f4f9',
    surface: '#ffffff',
    onPrimary: '#ffffff',
    cardColor: '#fafafa',
    cardSecondaryColor: '#f5f5f5',
    success: '#52c41a',
    successBackground: '#ddf8ed',
    error: '#ff4d4f',
    errorBackground: '#ffe9e9',
    info: '#1677ff',
    infoBackground: '#f3f4f4',
    warning: '#faad14',
    lightGray: '#fafafa',
    iconPrimary: '#7e828a',
    textPrimary: '#212121',
    textSecondary: '#424242',
    textTerritory: '#9e9e9e',
    textQuaternary: '#d9d9d9',
    // hint: '#a4a9b0',
    divider: '#d9d9d9',
    // drawer: '#feffff',
    border: '#d9d9d9' /*textQuaternary*/,
    appbar: '#30398b' /*primary*/,
  };
};

const getDarkTheme = (direction: Direction): ITheme => {
  return {
    id: ThemeID.DARK,
    direction: direction,
    primary: '#4958df',
    primaryDark: '#1f2366',
    primaryLight: '#4e5899',
    // primaryLightest: '#28283b',
    // secondary: '#646569',
    background: '#151521',
    surface: '#1e1e2d',
    onPrimary: '#ffffff',
    cardColor: '#232333',
    cardSecondaryColor: '#2c2c40',
    success: '#49aa19',
    successBackground: '#ddf8ed',
    error: '#dc4446',
    errorBackground: '#ffe9e9',
    info: '#1668dc',
    infoBackground: '#f3f4f4',
    warning: '#d89614',
    lightGray: '#fafafa',
    iconPrimary: '#f5f2e7',
    textPrimary: '#ffffff',
    textSecondary: '#d9d9d9',
    textTerritory: '#6d6d77',
    textQuaternary: '#5e5e66',
    // textPrimaryLight: '#d9d9d9',
    // hint: '#a4a9b0',
    divider: '#3e4761',
    // drawer: '#646569',
    border: '#3e4761',
    appbar: '#1e1e2d' /*surface*/,
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
