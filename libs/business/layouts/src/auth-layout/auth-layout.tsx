import { ReactNode } from 'react';
import { Layout } from 'antd';

import Appbar from '../components/appbar/appbar';
import AuthContent from '../components/auth-content/auth-content';

type DashboardLayoutProps = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <Layout>
      <Appbar variant='auth' />
      <Layout>
        <AuthContent>{children}</AuthContent>
      </Layout>
    </Layout>
  );
};

export default AuthLayout;
