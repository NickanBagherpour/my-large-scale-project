'use client';

import React, { useEffect } from 'react';
import { useTheme } from 'styled-components';

import { useTr } from '@oxygen/translation';
import { IConfig, ThemeID } from '@oxygen/types';
import { Button, Icons } from '@oxygen/ui-kit';

import AppbarUserMenu from './appbar-user-menu';
import { useAsync, useAuth } from '@oxygen/hooks';
import { Api } from '../../services';

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
  const theme = useTheme();
  const { user, setUser } = useAuth();
  const { asyncState: stateUserProfile, execute: executeUserProfile } = useAsync();

  // console.log('test', 'user', user);

  useEffect(() => {
    // console.log('test12', 'user', user);

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
        <Button shape={'circle'} variant='text' className={'menu-toggle-wrapper'} onClick={onToggleDrawer}>
          <S.styleIcon className={'icon-hamburger-menu'} />
          {/*{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}*/}
        </Button>

        <span className={'appbar-title-logo-date'}>
          {theme.id !== ThemeID.DARK ? <Icons.OxygenTextLogo /> : <Icons.OxygenDarkTextLogo />}
        </span>
        <AppbarUserMenu
          userInfo={user}
          onLogout={onLogout}
          isMobileOrTablet={isMobileOrTablet}
          loading={stateUserProfile.loading}
        />
      </>
    );
  };
  const getDesktopAppbar = () => {
    return (
      <>
        <span className={'appbar-title-oxygen-logo'}>
          {theme.id !== ThemeID.DARK ? <Icons.OxygenTextLogo /> : <Icons.OxygenDarkTextLogo />}
        </span>

        <span style={{ flexGrow: 1 }} />

        <AppbarUserMenu
          userInfo={user}
          onLogout={onLogout}
          isMobileOrTablet={isMobileOrTablet}
          loading={stateUserProfile.loading}
        />
        <S.Divider />
        <span className={'appbar-title-bank-logo'}>
          <Icons.BankLogo />
        </span>
      </>
    );
  };

  return <S.AppBar>{isMobileOrTablet ? getMobileAppbar() : getDesktopAppbar()}</S.AppBar>;
};

export default Appbar;
