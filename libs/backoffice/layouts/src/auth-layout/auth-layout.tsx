'use client';

import { ReactNode } from 'react';
import { useConfig, useResponsive } from '@oxygen/hooks';
import Appbar from '../components/appbar/appbar';
import Content from '../components/auth-content/auth-content';
import { Layout } from 'antd';

type DashboardLayoutProps = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: DashboardLayoutProps) => {
  const { config } = useConfig();
  const { isMobileOrTablet } = useResponsive();
  return (
    <Layout>
      <Appbar variant='auth' config={config} isMobileOrTablet={isMobileOrTablet} />
      <Layout>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AuthLayout;
