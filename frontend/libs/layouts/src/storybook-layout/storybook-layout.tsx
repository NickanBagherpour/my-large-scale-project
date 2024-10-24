import React, { ReactNode, useState } from 'react';
import { Layout } from 'antd';

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
    <Layout>
      <StoryBookAppbar config={config} isMobileOrTablet={isMobileOrTablet} />
      <S.MainContent>{children}</S.MainContent>
    </Layout>
  );
};

export default StorybookLayout;
