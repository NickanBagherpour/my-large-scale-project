import React from 'react';

import * as S from './container.style';

export interface IWidgetWrapperProps {
  title?: string[] | string;
  subtitle?: string | number;
  caption?: React.ReactNode;
  children?: React.ReactNode;
  isFullHeight?: boolean;
  className?: string;
}

export const Container = (props: IWidgetWrapperProps) => {
  const { title, subtitle, children, caption, isFullHeight = true, className = '' } = props;

  const widgetTitle = title;
  const widgetSubTitle = subtitle;

  return (
    <S.WidgetWrapperContainer isFullHeight={isFullHeight} className={className}>
      <S.Header>
        <div className='header__title'>{widgetTitle}</div>
        <div className='header__subtitle'>{widgetSubTitle}</div>
        <div className='header__caption'>{caption}</div>
      </S.Header>
      <S.Divider />

      <S.BodyContainer>{children}</S.BodyContainer>
    </S.WidgetWrapperContainer>
  );
};
