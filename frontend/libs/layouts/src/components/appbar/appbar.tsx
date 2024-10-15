import React from 'react';
import Image from 'next/image';

import { useTr } from '@oxygen/translation';
import { ENV_CONSTANTS, fullDateLocale } from '@oxygen/utils';
import { IConfig } from '@oxygen/types';
import { OxegenLogo, Button, LocaleSwitcher, BankLogo, ThemeSwitch, Select } from '@oxygen/ui-kit';

import * as S from './appbar.style';
import AppBarMenu from '../appbar-menu/appbar-menu';
import { MenuProps } from 'antd';

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

  const items: MenuProps['items'] = [
    {
      label: (
        <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
          1st menu item
        </a>
      ),
      key: '0',
    },
    {
      label: (
        <a target='_blank' rel='noopener noreferrer' href='https://www.aliyun.com'>
          2nd menu item
        </a>
      ),
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: '3rd menu item（disabled）',
      key: '3',
      disabled: true,
    },
  ];

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

        <S.StyleDropDown menu={{ items }} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            علیرضا غفار
            {/* <DownOutlined /> */}
          </a>
        </S.StyleDropDown>

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
