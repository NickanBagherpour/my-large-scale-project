'use client';

import { ReactNode } from 'react';
import { Layout } from 'antd';

import { useConfig, useResponsive } from '@oxygen/hooks';

import Appbar from '../components/appbar/appbar';
import AuthContent from '../components/auth-content/auth-content';

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
        <AuthContent>{children}</AuthContent>
      </Layout>
    </Layout>
  );
};

export default AuthLayout;
