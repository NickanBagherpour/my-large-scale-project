'use client';

import React, { ReactNode, useState } from 'react';
import { Layout } from 'antd';

import { useAuth, useConfig, useResponsive } from '@oxygen/hooks';

import { Protected } from '@oxygen/reusable-components';
import Appbar from '../components/appbar/appbar';
import Drawer from '../components/drawer/drawer';
import MainContent from '../components/main-content/main-content';

import * as S from './auth-layout.style';

type DashboardLayoutProps = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: DashboardLayoutProps) => {
  const { config } = useConfig();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { isMobile, isMobileOrTablet, isUndefined } = useResponsive();
  const { logout } = useAuth();

  const toggleDrawer = () => {
    if (isMobile) {
      if (!collapsed) showDrawer();
      else onClose();
      return;
    }
    setCollapsed(!collapsed);
  };

  const showDrawer = () => {
    if (isMobile) {
      setOpenDrawer(true);
    }
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  const handleLogout = () => {
    // setOpenDrawer(false);
    // console.log('logout clicked');

    logout();
  };

  function handleOnBreakpoint(broken: boolean) {
    if (broken && !collapsed) {
      setCollapsed(true);
    }
  }

  return (
    <Protected>
      {/* <S.MainLayout> */}
      <Appbar
        onToggleDrawer={toggleDrawer}
        onLogout={handleLogout}
        config={config}
        isMobileOrTablet={isMobileOrTablet}
      />
      <MainContent>{children}</MainContent>

      {/* <Layout>
          <Drawer
            shouldDisplaySider={!isUndefined && !isMobile}
            shouldDisplayDrawer={isMobile}
            direction={config.direction}
            openDrawer={openDrawer}
            siderCollapsed={collapsed}
            onBreakpoint={handleOnBreakpoint}
            onClose={onClose}
          />

          <S.MainContentLayout>
            <MainContent>{children}</MainContent>
          </S.MainContentLayout>
        </Layout> */}
      {/* <S.MainContentLayout> */}
      {/* <MainContent>{children}</MainContent> */}
      {/* </S.MainContentLayout> */}
      {/* </S.MainLayout> */}
    </Protected>
  );
};

export default AuthLayout;
