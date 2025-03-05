import React from 'react';
import { TooltipProps as AntToolTipProps } from 'antd';
import * as S from './tooltip.style';

export type TooltipProps = AntToolTipProps & {};

export const Tooltip = (props: TooltipProps) => {
  const { children, arrow = false, ...rest } = props;
  return (
    <S.StyledToolTip arrow={arrow} {...rest}>
      {children}
    </S.StyledToolTip>
  );
};
