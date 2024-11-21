'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

import { useTr } from '@oxygen/translation';
import { IConfig, ThemeID } from '@oxygen/types';
import { Button, Icons, ThemeSwitch } from '@oxygen/ui-kit';
import { useAsync, useAuth } from '@oxygen/hooks';
import { ENV_CONSTANTS, ROUTES } from '@oxygen/utils';

import AppbarUserMenu from './appbar-user-menu';
import { useTheme } from 'styled-components';
import { Api } from '../../services';

import * as S from './appbar.style';

export type AppBarProps = {
  variant?: 'auth' | 'dashboard';
  isMobileOrTablet: boolean;
  config: IConfig;
  onToggleDrawer?: React.MouseEventHandler;
  onLogout?: any;
  children?: React.ReactNode;
};

const Appbar = (props: AppBarProps) => {
  const { variant = 'dashboard', onToggleDrawer, isMobileOrTablet, config, onLogout } = props;
  const [t] = useTr();
  const { user, setUser } = useAuth();
  const { asyncState: stateUserProfile, execute: executeUserProfile } = useAsync();
  const theme = useTheme();

  // console.log('test', 'user', user);

  useEffect(() => {
    // console.log('test12', 'user', user);

    if (!user && variant === 'dashboard') {
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
        {variant === 'dashboard' && (
          <Button shape={'circle'} variant='text' className={'menu-toggle-wrapper'} onClick={onToggleDrawer}>
            <S.styleIcon className={'icon-hamburger-menu'} />
            {/*{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}*/}
          </Button>
        )}
        <span className={'appbar-title-logo-date'}>
          <Link href={ROUTES.CUSTOMER.DASHBOARD}>
            {theme.id !== ThemeID.DARK ? <Icons.OxygenLogo /> : <Icons.OxygenDarkLogo />}
          </Link>
        </span>
        <AppbarUserMenu
          variant={variant}
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
          <Link href={ROUTES.CUSTOMER.DASHBOARD}>
            {theme.id !== ThemeID.DARK ? <Icons.OxygenLogo /> : <Icons.OxygenDarkLogo />}
          </Link>
        </span>

        <span style={{ flexGrow: 1 }} />

        {variant === 'dashboard' ? (
          <>
            <AppbarUserMenu
              userInfo={user}
              onLogout={onLogout}
              isMobileOrTablet={isMobileOrTablet}
              loading={stateUserProfile.loading}
            />
            <S.Divider />
          </>
        ) : ENV_CONSTANTS.IS_DEV ? (
          <>
            <ThemeSwitch />
            <S.Divider />
          </>
        ) : (
          <></>
        )}

        <span className={'appbar-title-bank-logo'}>
          <Icons.BankLogo />
        </span>
      </>
    );
  };

  return <S.AppBar>{isMobileOrTablet ? getMobileAppbar() : getDesktopAppbar()}</S.AppBar>;
};

export default Appbar;
