import React from 'react';
import Image from 'next/image';

import { useTr } from '@oxygen/translation';
import { ENV_CONSTANTS, fullDateLocale } from '@oxygen/utils';
import { IConfig } from '@oxygen/types';
import { BaamsunLogo, bankLogo, Button, LocaleSwitcher, ThemeSwitch } from '@oxygen/ui-kit';

import * as S from './appbar.style';
import AppBarMenu from '../appbar-menu/appbar-menu';

export type AppBarProps = {
  isMobileOrTablet: boolean;
  config: IConfig;
  onToggleDrawer?: React.MouseEventHandler;
  onLogout?: any;
  children?: React.ReactNode;
};

const Appbar = (props: AppBarProps) => {
  const { onToggleDrawer, isMobileOrTablet, config } = props;
  const [t] = useTr();

  const getMobileAppbar = () => {
    return (
      <>
        <Button shape={'circle'} type={'text'} className={'menu-toggle-wrapper'} onClick={onToggleDrawer}>
          <i className={'ri-menu-line'} />
          {/*{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}*/}
        </Button>

        <span className={'appbar-title-logo-date'}>
          <BaamsunLogo />
        </span>
        <AppBarMenu />
      </>
    );
  };

  const getDesktopAppbar = () => {
    return (
      <>
        <span className={'menu-toggle-wrapper'} onClick={onToggleDrawer}>
          <i className={'ri-menu-line'} />
          {/*{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}*/}
        </span>

        <span className={'appbar-title-logo-date'}>
          <BaamsunLogo />
          <span>{fullDateLocale(undefined, config.locale)}</span>
        </span>

        <span style={{ flexGrow: 1 }} />

        <span className={'appbar-title-bank-logo'}>
          <Image src={bankLogo} alt='Bank Melli' />
        </span>

        <ThemeSwitch />

        {(ENV_CONSTANTS.IS_DEV || true) && <LocaleSwitcher />}

        <S.Divider />

        <span className={'appbar-item'}>
          <Button icon={<i className='ri-notification-2-fill' />} type='text' shape='circle' />
        </span>

        <span className={'appbar-item'}>
          <Button icon={<i className='ri-logout-box-r-line' />} type='text' shape='circle' onClick={props.onLogout} />
        </span>
      </>
    );
  };

  return <S.AppBar>{isMobileOrTablet ? getMobileAppbar() : getDesktopAppbar()}</S.AppBar>;
};

export default Appbar;
