'use client';

import { ThemeConfig } from '@oxygen/ui-kit';
import { IConfig } from '@oxygen/types';
import { changeLanguage } from '@oxygen/translation';

import { QueryProvider, AuthProvider, ConfigProvider, MenuProvider } from '../index';
import { NotificationProvider } from '../use-app/use-app';

type BaseProviderProps = {
  children: React.ReactNode;
  initialConfig: IConfig | null;
};

const BaseProvider = ({ children, initialConfig }: BaseProviderProps) => {
  const handleLocaleChange = (config: IConfig) => {
    changeLanguage(config.locale);

    if (document) document.dir = config.direction;
  };

  return (
    <ConfigProvider initialConfig={initialConfig}>
      <ThemeConfig onLocaleChange={handleLocaleChange}>
        <NotificationProvider>
          <QueryProvider>
            <AuthProvider>
              <MenuProvider>{children}</MenuProvider>
            </AuthProvider>
          </QueryProvider>
        </NotificationProvider>
      </ThemeConfig>
    </ConfigProvider>
  );
};

export default BaseProvider;
