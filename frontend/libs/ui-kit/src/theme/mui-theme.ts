import { Button, Direction, PaletteMode, ThemeProvider, createTheme } from '@mui/material';

import { ITheme } from '@oxygen-portal/types';

const getMuiTheme = (themeBase: ITheme) => {
  return createTheme({
    direction: themeBase.base.direction as Direction,
    shape: {
      borderRadius: 8,
    },
    palette: {
      mode: themeBase.base.id as PaletteMode,
      primary: {
        main: themeBase.base.primary,
      },
      secondary: {
        main: themeBase.base.surface,
      },
      success: {
        main: themeBase.base.success,
        light: themeBase.base.successBackground,
      },
      error: {
        main: themeBase.base.error,
        light: themeBase.base.errorBackground,
      },
      warning: {
        main: themeBase.base.warning,
        light: themeBase.base.warningBackground,
      },
      info: {
        main: themeBase.base.info,
        light: themeBase.base.infoBackground,
      },
      divider: themeBase.base.border,
      background: {
        default: themeBase.base.surface,
        paper: themeBase.base.surface,
      },
    },
    typography: {
      fontFamily: 'inherit',
      htmlFontSize: 10,
    },
    components: {},
  });
};

export default getMuiTheme;
