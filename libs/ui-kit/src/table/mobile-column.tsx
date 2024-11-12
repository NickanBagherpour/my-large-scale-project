import React from 'react';

import * as S from './table.style';

export type MobileColumnProps = {
  title?: React.ReactNode;
  value?: React.ReactNode;
  minHeight?: React.CSSProperties['minHeight'];
};

export const MobileColumn = (props: MobileColumnProps) => {
  const { title, value, minHeight = 'unset' } = props;

  return (
    <S.MobileColumnWrapper min_height={minHeight}>
      <span className={'item__title'}>{title}</span>
      <span className={'item__value'}>{value}</span>
    </S.MobileColumnWrapper>
  );
};
