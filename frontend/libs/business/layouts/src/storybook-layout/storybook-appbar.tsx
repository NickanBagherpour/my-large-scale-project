'use client';

import React, { useEffect } from 'react';

import { useTr } from '@oxygen/translation';
import { IConfig } from '@oxygen/types';
import { ThemeSwitch, LocaleSwitcher } from '@oxygen/ui-kit';

import * as S from './storybook-layout.style';

export type StoryBookAppbarProps = {
  isMobileOrTablet: boolean;
  config: IConfig;
  children?: React.ReactNode;
};

const StoryBookAppbar = (props: StoryBookAppbarProps) => {
  const [t] = useTr();

  return (
    <S.Header>
      <LocaleSwitcher type='onPrimary' />
      <S.ThemeSwitchWrapper>
        <ThemeSwitch /> {t('appbar.background_color')}
      </S.ThemeSwitchWrapper>
    </S.Header>
  );
};

export default StoryBookAppbar;
