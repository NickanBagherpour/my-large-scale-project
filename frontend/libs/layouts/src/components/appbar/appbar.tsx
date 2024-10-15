import React from 'react';
import Image from 'next/image';

import { useTr } from '@oxygen/translation';
import { ENV_CONSTANTS, fullDateLocale } from '@oxygen/utils';
import { IConfig } from '@oxygen/types';
import { OxegenLogo, Button, LocaleSwitcher, BankLogo, ThemeSwitch, Select } from '@oxygen/ui-kit';

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
          <OxegenLogo />
        </span>
        <AppBarMenu />
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

        <Select defaultValue='alireza ghaffar' style={{ width: 120 }}>
          <Select.Option value='jack'>Jack</Select.Option>
          <Select.Option value='lucy'>Lucy</Select.Option>
          <Select.Option value='disabled' disabled>
            Disabled
          </Select.Option>
          <Select.Option value='Yiminghe'>yiminghe</Select.Option>
        </Select>
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
