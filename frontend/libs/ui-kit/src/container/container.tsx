import React from 'react';

import * as S from './container.style';

export interface IWidgetWrapperProps {
  title?: string[] | string;
  subtitle?: string | number;
  caption?: React.ReactNode;
  children?: React.ReactNode;
  fillContainer?: boolean;
  className?: string;
  style?: React.CSSProperties;
  margin?: string | number;
  marginTop?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
}

export const Container = (props: IWidgetWrapperProps) => {
  const {
    title,
    subtitle,
    children,
    caption,
    fillContainer = true,
    className = '',
    style,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
  } = props;

  const widgetTitle = title;
  const widgetSubTitle = subtitle;

  const combinedStyle: React.CSSProperties = {
    ...style,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
  };

  return (
    <S.WidgetWrapperContainer fill_container={fillContainer} className={className} style={combinedStyle}>
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
