import React from 'react';
import * as S from './widget-wrapper.style';

export type WidgetWrapperProps = {
  children?: React.ReactNode;
  padding?: string;
  overflow_x?: React.CSSProperties['overflowX'];
};

export const WidgetWrapper = (props: WidgetWrapperProps) => {
  return <S.WidgetWrapper>{props.children}</S.WidgetWrapper>;
};
