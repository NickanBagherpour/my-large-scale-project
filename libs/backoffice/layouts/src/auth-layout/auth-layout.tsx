'use client';

import { ReactNode } from 'react';
import { Layout } from 'antd';

import Appbar from '../components/appbar/appbar';
import AuthContent from '../components/auth-content/auth-content';
import * as S from './auth-layout.style';

type DashboardLayoutProps = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <S.MainContentLayout>
      <Appbar variant='auth' />
      <Layout>
        <AuthContent>{children}</AuthContent>
      </Layout>
    </S.MainContentLayout>
  );
};

export default AuthLayout;
