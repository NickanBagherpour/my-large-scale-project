import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Space } from 'antd';

import { useTr } from '@oxygen/translation';
import { bankLogoBlack, bankLogo, Button, LocaleSwitcher, ThemeSwitch } from '@oxygen/ui-kit';
import { IConfig, ThemeID } from '@oxygen/types';
import { CONSTANTS, ENV_CONSTANTS, MAIN_HREF } from '@oxygen/utils';

import AppBarMenu from '../appbar-menu/appbar-menu';

import * as S from './landing-appbar.style';

export type LandingAppBarProps = {
  isMobileOrTablet: boolean;
  config: IConfig;
  onToggleDrawer?: React.MouseEventHandler;
  onLogout?: any /*React.MouseEventHandler*/;
  isAuth?: boolean;
  isPrimaryAppbar?: boolean;
  children?: React.ReactNode;
};

const LandingAppbar = (props: LandingAppBarProps) => {
  const { isMobileOrTablet, config, isPrimaryAppbar = false } = props;
  const [t] = useTr();

  function getBankImage() {
    if (isPrimaryAppbar) {
      return bankLogo;
    }

    if (config.themeId === ThemeID.DARK) {
      return bankLogo;
    }

    return bankLogoBlack;
  }

  const bankImage = getBankImage();

  const getMobileAppbar = () => {
    return (
      <>
        <Image src={bankImage} alt='Bank Melli' className={'appbar-bank-logo'} />

        <AppBarMenu color={'textSecondary'} />
      </>
    );
  };

  function handleSubmit() {
    if (props.onLogout) props.onLogout();
  }

  const getDesktopAppbar = () => {
    return (
      <>
        <Image src={bankImage} alt='Bank Melli' className={'appbar-bank-logo'} />

        <Space size={'large'} role={'navigation'} className={'landing-nav'}>
          <Link href={CONSTANTS.CONTACT_US_LINK} target={'_blank'}>
            {t('layout.bank_site_link')}
          </Link>

          <Link href={CONSTANTS.CONTACT_US_LINK} target={'_blank'}>
            {t('layout.contact_us_link')}
          </Link>

          <Link href={CONSTANTS.HELP_LINK} target={'_blank'}>
            {t('layout.help_link')}
          </Link>
        </Space>

        <span style={{ flexGrow: 1 }} />

        <Space size={'middle'}>
          <ThemeSwitch />

          {(ENV_CONSTANTS.IS_DEV || true) && <LocaleSwitcher type={isPrimaryAppbar ? 'onPrimary' : 'textPrimary'} />}

          {props.isAuth ? (
            <span className={'logout-item'}>
              <Button
                type='text'
                shape='circle'
                icon={<i className='ri-logout-box-r-line' />}
                onClick={props.onLogout}
              />
            </span>
          ) : (
            <Link href={MAIN_HREF.AUTH} passHref>
              <Button type='primary' size='large'>
                {t('button.login_register')}
              </Button>
            </Link>
          )}
        </Space>
      </>
    );
  };

  return <S.AppBar primary={isPrimaryAppbar}>{isMobileOrTablet ? getMobileAppbar() : getDesktopAppbar()}</S.AppBar>;
};

export default LandingAppbar;
