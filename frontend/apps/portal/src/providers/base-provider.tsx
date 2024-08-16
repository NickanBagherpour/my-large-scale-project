'use client';

import { ThemeConfig } from '@oxygen-portal/ui-kit';
import { IConfig } from '@oxygen-portal/types';
import { ConfigProvider } from '@oxygen-portal/hooks';

type BaseProviderProps = {
  children: React.ReactNode;
};

const BaseProvider = ({ children }: BaseProviderProps) => {

  const handleLocaleChange = (config: IConfig) => {
    // changeLanguage(config.locale);
  };

  return (
    <>
        <ConfigProvider>
          <ThemeConfig onLocaleChange={handleLocaleChange}>
            {children}
          </ThemeConfig>
        </ConfigProvider>
    </>
  );
};

export default BaseProvider;
