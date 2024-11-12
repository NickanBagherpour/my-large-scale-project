'use client';

import { ThemeConfig } from '@oxygen/ui-kit';
import { IConfig } from '@oxygen/types';
import { changeLanguage } from '@oxygen/translation';

import { QueryProvider, ConfigProvider, AntStyleProvider } from '../index';

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
        <AntStyleProvider>
          <ConfigProvider initialConfig={null}>
            <ThemeConfig onLocaleChange={handleLocaleChange}>
              <QueryProvider>{children}</QueryProvider>
            </ThemeConfig>
          </ConfigProvider>
        </AntStyleProvider>
      }
    </div>
  );
};

export default TestProvider;
