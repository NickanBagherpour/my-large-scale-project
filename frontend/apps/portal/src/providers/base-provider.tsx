'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

type BaseProviderProps = {
  children: React.ReactNode;
};

const BaseProvider = ({ children }: BaseProviderProps) => {
  return (
    <>
      <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
    </>
  );
};

export default BaseProvider;
