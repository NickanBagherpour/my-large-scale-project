import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useTr } from '@oxygen/translation';
import { Icons, LocaleSwitcher, ThemeSwitch } from '@oxygen/ui-kit';
import { Anonymous } from '@oxygen/reusable-components';
import { CONSTANTS, ENV_CONSTANTS } from '@oxygen/utils';

import AppBarMenu from '../components/appbar-menu/appbar-menu';

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
      <S.Wrapper>hello</S.Wrapper>
    </Anonymous>
  );
};

export default AuthLayout;
