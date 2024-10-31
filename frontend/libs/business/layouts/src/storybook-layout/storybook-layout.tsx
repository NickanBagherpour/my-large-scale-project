import React, { ReactNode } from 'react';

import { useConfig, useResponsive } from '@oxygen/hooks';
import StoryBookAppbar from './storybook-appbar';

import * as S from './storybook-layout.style';

type StorybookLayoutProps = {
  children: ReactNode;
};

export const StorybookLayout = ({ children }: StorybookLayoutProps) => {
  const { config } = useConfig();
  const { isMobile, isMobileOrTablet, isUndefined } = useResponsive();

  return (
    <S.Layout>
      <StoryBookAppbar config={config} isMobileOrTablet={isMobileOrTablet} />
      <S.MainContent>{children}</S.MainContent>
    </S.Layout>
  );
};

export default StorybookLayout;
