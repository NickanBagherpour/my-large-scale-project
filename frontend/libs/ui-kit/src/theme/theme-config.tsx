import React, { useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { faIR } from '@mui/x-date-pickers/locales';

import { useConfig } from '@oxygen-portal/hooks';
import { Direction, IConfig, ITheme } from '@oxygen-portal/types';

import { Directionality } from './directionality';
import GlobalStyle from './global.style';
import getMuiTheme from './mui-theme';
import { getTheme } from './theme';

export interface ThemeConfigProps {
  onLocaleChange: (config: IConfig) => void;
  children: React.ReactNode;
}

const ThemeConfig = (props: ThemeConfigProps): JSX.Element => {
  const { config } = useConfig();

  const isRtl = config?.direction === Direction.RTL;
  const faIRLocaleText = faIR.components.MuiLocalizationProvider.defaultProps.localeText;

  const baseTheme: ITheme = getTheme(config);

  useEffect(() => {
    if (props.onLocaleChange) {
      props.onLocaleChange(config);
    }
  }, [config.locale]);

  return (
    <MuiThemeProvider theme={getMuiTheme(baseTheme)}>
      <ThemeProvider theme={baseTheme}>
        <LocalizationProvider
          // dateAdapter={AdapterDateFnsJalali} // fixme implement this part
          localeText={faIRLocaleText}
          dateFormats={{ monthShort: 'MMMM' }}
        >
          <Directionality isRtl={isRtl}>
            <CssBaseline />
            <GlobalStyle />
            {props.children}
          </Directionality>
        </LocalizationProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

// function isEqual(prevProps, nextProps): boolean {
//   return JSON.stringify(prevProps?.config ?? {}) === JSON.stringify(nextProps?.config ?? {});
// }

export default ThemeConfig;
// export default React.memo(ThemeConfig, isEqual);
