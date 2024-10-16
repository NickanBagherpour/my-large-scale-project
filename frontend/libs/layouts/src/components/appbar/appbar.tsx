'use client';

import React, { useEffect } from 'react';

import { useTr } from '@oxygen/translation';
import { IConfig } from '@oxygen/types';
import { OxegenLogo, Button, BankLogo } from '@oxygen/ui-kit';

import AppbarUserMenu from './appbar-user-menu';
import { useAsync, useAuth } from '@oxygen/hooks';

import * as S from './appbar.style';

export type AppBarProps = {
  isMobileOrTablet: boolean;
  config: IConfig;
  onToggleDrawer?: React.MouseEventHandler;
  onLogout?: any;
  children?: React.ReactNode;
};

const Appbar = (props: AppBarProps) => {
  const { onToggleDrawer, isMobileOrTablet, config, onLogout } = props;
  const [t] = useTr();
  const { user, setUser } = useAuth();
  const { asyncState: stateUserProfile, execute: executeUserProfile } = useAsync();

  useEffect(() => {
    if (!user) {
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await executeUserProfile(async () => await Api.getUserProfile());
      setUser(response);
      return response;
    } catch (error) {
      return null;
    }
  };

  const getMobileAppbar = () => {
    return (
      <>
        <Button shape={'circle'} type={'text'} className={'menu-toggle-wrapper'} onClick={onToggleDrawer}>
          <S.styleIcon className={'icon-hamburger-menu'} />
          {/*{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}*/}
        </Button>

        <span className={'appbar-title-logo-date'}>
          <OxegenLogo />
        </span>
        <AppbarUserMenu userInfo={user} onLogout={onLogout} isMobileOrTablet={isMobileOrTablet} loading={stateUserProfile.loading} />
      </>
    );
  };
  const getDesktopAppbar = () => {
    return (
      <>
        <span className={'appbar-title-oxygen-logo'}>
          <OxegenLogo />
        </span>

        <span style={{ flexGrow: 1 }} />

        <AppbarUserMenu userInfo={user} onLogout={onLogout} isMobileOrTablet={isMobileOrTablet} loading={stateUserProfile.loading} />
        <S.Divider />
        <span className={'appbar-title-bank-logo'}>
          <BankLogo />
        </span>
      </>
    );
  };

  return <S.AppBar>{isMobileOrTablet ? getMobileAppbar() : getDesktopAppbar()}</S.AppBar>;
};

export default Appbar;
