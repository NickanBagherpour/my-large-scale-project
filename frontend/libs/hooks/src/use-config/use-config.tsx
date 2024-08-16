'use client';

import React, { createContext, useCallback, useContext, useMemo } from 'react';

import { Direction, IConfig, Locale, LocalStorageKey, ThemeID } from '@oxygen-portal/types';

import useLocalStorage from '../use-local-storage/use-local-storage';

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
};

const ConfigProvider = (props: ConfigProviderProps) => {
  const [config, setConfig, removeConfig] = useLocalStorage<IConfig>(LocalStorageKey.CONFIG, defaultConfig);

  const setConfigCallback = useCallback(setConfig, []);

  function removeConfigHandler() {
    setConfig(null);
    removeConfig();
  }

  const updateConfig = useCallback(
    (newConfig: IConfig) => {
      setConfigCallback((prevState) => (prevState ? { ...prevState, ...newConfig } : newConfig));
    },
    [setConfigCallback],
  );

  const value = useMemo(() => {
    return {
      config: config ?? defaultConfig,
      updateConfig,
    };
  }, [JSON.stringify(config)]);

  return <ConfigContext.Provider value={value}>{props.children}</ConfigContext.Provider>;
};

export default ConfigProvider;
