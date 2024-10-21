import { ITheme, ThemeID } from '@oxygen/types';

const getLightTheme = (themeBase: ITheme) => {
  return {
    token: {
      colorPrimary: themeBase.primary.main,
    },
  };
};

function getDarkTheme(themeBase: ITheme) {
  return {
    token: {
      colorPrimary: themeBase.primary.main,
    },
  };
}

function makeTheme(themeBase: ITheme, antTheme: any) {
  return {
    token: {
      fontFamily: 'inherit',
      colorPrimary: themeBase.primary.main,
      // colorTextBase: themeBase.text.primary,
      // colorBgBase: themeBase.background.main,
      colorBgContainer: 'transparent',
      colorBgLayout: themeBase.background.main,
      // colorBgContainer: themeBase.surface,
      //
    },
    algorithm: themeBase.id === ThemeID.DARK ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
    components: {
      Tree: {
        nodeSelectedBg: themeBase.primary._200,
      },
      Modal: {
        contentBg: themeBase.surface,
        headerBg: themeBase.surface,
        footerBg: themeBase.surface,
      },
    },
  };
}

const getAntTheme = (themeBase: ITheme, antTheme: any) => {
  return makeTheme(themeBase, antTheme);
};

export const getOldAntTheme = (themeBase: ITheme) => {
  switch (themeBase.id) {
    case ThemeID.DARK:
      return getDarkTheme(themeBase);
    case ThemeID.LIGHT:
    default:
      return getLightTheme(themeBase);
  }
};

export default getAntTheme;
