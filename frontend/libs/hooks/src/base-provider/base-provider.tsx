'use client';

import { ThemeConfig } from '@oxygen/ui-kit';
import { IConfig } from '@oxygen/types';
import { changeLanguage } from '@oxygen/translation';

import { QueryProvider, AuthProvider, ConfigProvider, MenuProvider } from '../index';

type BaseProviderProps = {
  children: React.ReactNode;
};

const BaseProvider = ({ children }: BaseProviderProps) => {
  const handleLocaleChange = (config: IConfig) => {
    changeLanguage(config.locale);

    if (document) document.dir = config.direction;
  };

  return (
    <>
      <ConfigProvider>
        <ThemeConfig onLocaleChange={handleLocaleChange}>
        <QueryProvider>
          <AuthProvider>
            <MenuProvider>{children}</MenuProvider>
          </AuthProvider>
          </QueryProvider>
        </ThemeConfig>
      </ConfigProvider>
    </>
  );
};

export default BaseProvider;
