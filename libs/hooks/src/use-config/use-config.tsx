'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { Direction, IConfig, Locale, ThemeID } from '@oxygen/types';

import { setCookie } from '@oxygen/utils';

const defaultConfig = {
  themeId: ThemeID.LIGHT,
  direction: Direction.RTL,
  locale: Locale.FA_IR,
};

const defaultValue = {
  config: defaultConfig as IConfig,
  updateConfig: (config: IConfig) => {
    /**/
  },
};

export const ConfigContext = createContext(defaultValue);

export const useConfig = () => {
  return useContext(ConfigContext);
};

type ConfigProviderProps = {
  children: React.ReactNode;
  initialConfig: IConfig | null;
};

const ConfigProvider = (props: ConfigProviderProps) => {
  const { initialConfig } = props;
  const [cookieConfig, setCookieConfig] = useState<IConfig | null>(initialConfig);

  const updateConfig = useCallback(
    (newConfig: IConfig) => {
      setCookieConfig(newConfig);
      setCookie('configuration', JSON.stringify(newConfig), 5 * 365 * 24 * 60); //5 years
    },
    [setCookieConfig],
  );

  const value = useMemo(() => {
    return {
      config: cookieConfig ?? defaultConfig,
      updateConfig,
    };
  }, [JSON.stringify(cookieConfig)]);

  return <ConfigContext.Provider value={value}>{props.children}</ConfigContext.Provider>;
};

export default ConfigProvider;
