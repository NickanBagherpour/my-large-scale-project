'use client';

import React, { ReactNode } from 'react';

import { useTr } from '@oxygen/translation';
import * as S from './auth-layout.style';

type AuthLayoutProps = {
  children: ReactNode;
  title?: string;
};

export const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  const [t] = useTr();

  return <S.Wrapper>{children}</S.Wrapper>;
};

export default AuthLayout;
