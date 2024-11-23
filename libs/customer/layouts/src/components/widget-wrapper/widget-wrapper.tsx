import React, { Fragment } from 'react';

import { useAppTheme } from '@oxygen/hooks';

import * as S from './widget-wrapper.style';

export type WidgetWrapperProps = {
  children?: React.ReactNode;
  padding?: string;
  overflow_x?: React.CSSProperties['overflowX'];
};

export const WidgetWrapper = (props: WidgetWrapperProps) => {
  const theme = useAppTheme();
  const { padding = '2.4rem', overflow_x = 'scroll' } = props;

  return <S.WidgetWrapper>{props.children}</S.WidgetWrapper>;
};
