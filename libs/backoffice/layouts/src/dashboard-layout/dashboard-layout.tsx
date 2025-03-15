'use client';

import React, { ReactNode, useState } from 'react';
import { Layout } from 'antd';

import { useResponsive } from '@oxygen/hooks';

import Appbar from '../components/appbar/appbar';
import Drawer from '../components/drawer/drawer';
import MainContent from '../components/main-content/main-content';

import * as S from './dashboard-layout.style';

type DashboardLayoutProps = {
  children: ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { isMobile, isUndefined } = useResponsive();

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

  function handleOnBreakpoint(broken: boolean) {
    if (broken && !collapsed) {
      setCollapsed(true);
    }
  }

  return (
    <S.MainLayout>
      <Appbar onToggleDrawer={toggleDrawer} />

      <Layout>
        <Drawer
          shouldDisplaySider={!isUndefined && !isMobile}
          shouldDisplayDrawer={isMobile}
          openDrawer={openDrawer}
          onBreakpoint={handleOnBreakpoint}
          onClose={onClose}
        />

        <S.MainContentLayout>
          <MainContent>{children}</MainContent>
        </S.MainContentLayout>
      </Layout>
    </S.MainLayout>
  );
};

export default DashboardLayout;
