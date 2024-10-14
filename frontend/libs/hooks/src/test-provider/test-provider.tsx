'use client';

import { ThemeConfig } from '@oxygen/ui-kit';
import { IConfig } from '@oxygen/types';
import { changeLanguage } from '@oxygen/translation';

import { QueryProvider, ConfigProvider } from '../index';

type TestProviderProps = {
  children?: React.ReactNode;
};

const TestProvider = ({ children }: TestProviderProps) => {
  const handleLocaleChange = (config: IConfig) => {
    changeLanguage(config.locale);

    if (document) document.dir = config.direction;
  };

  return (
    <div>
      {
        <ConfigProvider>
          <ThemeConfig onLocaleChange={handleLocaleChange}>
            <QueryProvider>{children}</QueryProvider>
          </ThemeConfig>
        </ConfigProvider>
      }
    </div>
  );
};

export default TestProvider;
