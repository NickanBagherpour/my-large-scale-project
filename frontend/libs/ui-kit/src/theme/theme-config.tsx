import React, { useEffect } from 'react';
import { ConfigProvider as AntConfigProvider } from 'antd';
import { ThemeProvider } from 'styled-components';

import { useConfig } from '@oxygen/hooks';
import { Direction, IConfig, ITheme } from '@oxygen/types';

import { Directionality } from './directionality';
import { getTheme } from './theme';
import { getAntBaseConfig } from './ant-base-config';
import GlobalStyle from './global.style';

export interface ThemeConfigProps {
  onLocaleChange: (config: IConfig) => void;
  children: React.ReactNode;
}

const ThemeConfig = (props: ThemeConfigProps): JSX.Element => {
  const { config } = useConfig();

  const isRtl = config?.direction === Direction.RTL;

  const baseTheme: ITheme = getTheme(config);

  useEffect(() => {
    if (props.onLocaleChange) {
      props.onLocaleChange(config);
    }
  }, [config.locale]);

  return (
    <ThemeProvider theme={baseTheme}>
      <Directionality isRtl={isRtl}>
        <GlobalStyle />
        <AntConfigProvider {...getAntBaseConfig(config)}>{props.children}</AntConfigProvider>
      </Directionality>
    </ThemeProvider>
  );
};

// function isEqual(prevProps, nextProps): boolean {
//   return JSON.stringify(prevProps?.config ?? {}) === JSON.stringify(nextProps?.config ?? {});
// }

export default ThemeConfig;
// export default React.memo(ThemeConfig, isEqual);
