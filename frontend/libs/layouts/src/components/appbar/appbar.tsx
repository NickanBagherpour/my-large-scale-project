import React from 'react';
import Image from 'next/image';

import { useTr } from '@oxygen/translation';
import { cssVar, ENV_CONSTANTS, fullDateLocale } from '@oxygen/utils';
import { IConfig } from '@oxygen/types';
import { OxegenLogo, Button, LocaleSwitcher, BankLogo, ThemeSwitch, Select } from '@oxygen/ui-kit';

import * as S from './appbar.style';
import AppBarMenu from '../appbar-menu/appbar-menu';
import { MenuProps } from 'antd';
import AppbarUserMenu from './appbar-user-menu';

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

  const getMobileAppbar = () => {
    return (
      <>
        <Button shape={'circle'} type={'text'} className={'menu-toggle-wrapper'} onClick={onToggleDrawer}>
          <i className={'icon-hamburger-menu'} style={{ color: 'black' }} />
          {/*{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}*/}
        </Button>

        <span className={'appbar-title-logo-date'}>
          <OxegenLogo />
        </span>
        <AppBarMenu />
      </>
    );
  };
  const userInfo = { userName: 'علیرضا غفار', userRole: 'مسئول اصلی' };
  const getDesktopAppbar = () => {
    return (
      <>
        <span className={'appbar-title-oxygen-logo'}>
          <OxegenLogo />
        </span>

        <span style={{ flexGrow: 1 }} />

        <AppbarUserMenu userInfo={userInfo} onLogout={onLogout} />
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
