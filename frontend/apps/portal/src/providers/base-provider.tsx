'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeConfig } from '@oxygen-portal/ui-kit';
import { IConfig } from '@oxygen-portal/types';

type BaseProviderProps = {
  children: React.ReactNode;
};

const BaseProvider = ({ children }: BaseProviderProps) => {

  const handleLocaleChange = (config: IConfig) => {
    // changeLanguage(config.locale);
  };

  return (
    <>
      <AppRouterCacheProvider>
        <ThemeConfig onLocaleChange={handleLocaleChange}>
        {children}
        </ThemeConfig>
      </AppRouterCacheProvider>
    </>
  );
};

export default BaseProvider;
