import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useTr } from '@oxygen/translation';
import { Icons, LocaleSwitcher, ThemeSwitch } from '@oxygen/ui-kit';
import { CONSTANTS, ENV_CONSTANTS } from '@oxygen/utils';

import AppBarMenu from '../components/appbar-menu/appbar-menu';
import Anonymous from '../components/anonymous/anonymous';

import * as authBG from '../assets/media/auth-bg.png';
import * as S from './auth-layout.style';

type AuthLayoutProps = {
  children: ReactNode;
  title?: string;
};

export const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  const [t] = useTr();

  return (
    <Anonymous>
      <S.Wrapper>
        <div className={'auth-container'}>
          <S.RightPanelContainer>
            <nav className={'right-panel__nav'}>
              <AppBarMenu />
            </nav>

            <div className={'right-panel__main'}>{children}</div>

            <footer className={'right-panel__footer'}>
              {/*<img src={`/media/support_agent.svg`} alt='support'/>*/}

              <p>{t('layout.support_phone', { support_phone: CONSTANTS.SUPPORT_PHONE })}</p>
            </footer>
          </S.RightPanelContainer>

          <S.LeftPanelContainer>
            <span className='auth-bg-container'>
              {/*<AuthBG />*/}
              <Image src={authBG} alt={'bg'} />
            </span>

            <nav className={'left-panel__nav'}>
              <Link href={CONSTANTS.REGISTER_LINK} target={'_blank'}>
                {t('layout.register_link')}
              </Link>

              <Link href={CONSTANTS.CONTACT_US_LINK} target={'_blank'}>
                {t('layout.contact_us_link')}
              </Link>

              {/*
                <Link href="src/scripts/app#" >
                          {t('contactUsLink')}
                </Link>
                */}

              <Link href={CONSTANTS.HELP_LINK} target={'_blank'}>
                {t('layout.help_link')}
              </Link>

              <ThemeSwitch />

              {(ENV_CONSTANTS.IS_DEV || true) && <LocaleSwitcher type='onPrimary' />}

              <span className={'left-panel__nav__bank-logo'}>
                <Image
                  // src={bankLogo}
                  src={Icons.bankLogo}
                  alt='Bank Melli'
                />
              </span>
            </nav>

            <div className={'left-panel__middle'}>
              {/*<img src={`./media/device.png`} alt={'motto'} />*/}
              <p className='left-panel__middle__team-name'>{t('app.team_name')}</p>
              <p className='left-panel__middle__motto'>{t('app.motto')}</p>
            </div>

            <footer className={'left-panel__footer'}>
              <p>{t('layout.copy_right')}</p>
            </footer>
          </S.LeftPanelContainer>
        </div>
      </S.Wrapper>
    </Anonymous>
  );
};

export default AuthLayout;
