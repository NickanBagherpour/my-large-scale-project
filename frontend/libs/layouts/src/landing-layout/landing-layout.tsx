import React, { ReactNode, useState } from 'react';
import { Layout, Space } from 'antd';

import { useAuth, useConfig, useResponsive } from '@oxygen/hooks';

import ClientOnly from '../components/client-only/client-only';
import LandingAppbar from '../components/appbar/landing-appbar';

type LandingLayoutProps = {
  children: ReactNode;
  isPrimaryAppbar?: boolean;
};
export const LandingLayout = ({ children, isPrimaryAppbar = false }: LandingLayoutProps) => {
  const { config } = useConfig();
  const { isMobileOrTablet } = useResponsive();
  const { isAuth, logout } = useAuth();

  const handleLogout = () => {
    // setOpenDrawer(false);
    // console.log('logout clicked');

    logout();
  };

  return (
    <ClientOnly>
      <Layout>
        <LandingAppbar
          config={config}
          isAuth={isAuth}
          onLogout={handleLogout}
          isMobileOrTablet={isMobileOrTablet}
          isPrimaryAppbar={isPrimaryAppbar}
        />

        <Layout>{children}</Layout>
      </Layout>
    </ClientOnly>
  );
};

export default LandingLayout;
