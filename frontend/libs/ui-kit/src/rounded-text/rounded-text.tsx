import { Chip as MuiChip, ChipProps as MuiChipProps, styled } from '@mui/material';
import React, { CSSProperties } from 'react';

import { useAppTheme } from '@oxygen-portal/hooks';

export type kindType = 'manual' | 'success' | 'warning' | 'error' | 'info' | 'info-light' | 'error-light' | 'purple';
export type RoundedTextProps = Omit<MuiChipProps, 'color' | 'variant'> & {
  kind?: kindType;
  bordered?: boolean;
  color?: CSSProperties['color'];
  bgColor?: CSSProperties['color'];
  minWidth?: CSSProperties['minWidth'];
};

const StyledChip = styled(MuiChip)<any>`
  font-size: 1.2rem;
  font-weight: 400;

  background-color: ${(p) => p._bgcolor};
  border: ${(p) => (p.bordered ? `1px solid ${p._color}` : 'none')};

  & .MuiChip-label {
    color: ${(p) => p._color};
    min-width: ${(p) => p.min_width};
    text-align: center;
  }
`;

const RoundedText: React.FC<RoundedTextProps> = (props) => {
  const { children, size = 'small', kind = 'manual', color, bgColor, minWidth = '7rem', ...rest } = props;

  const theme = useAppTheme();

  const colors = calcColors(kind);

  function calcColors(kind) {
    switch (kind) {
      case 'success':
        return {
          color: theme.base.success,
          bgColor: theme.base.successBackgroundLight,
        };
      case 'warning':
        return {
          color: theme.base.warning,
          bgColor: theme.base.warningBackgroundLight,
        };
      case 'error':
        return {
          color: theme.base.error,
          bgColor: theme.base.errorBackgroundLight,
        };
      case 'info':
        return {
          color: theme.base.info,
          bgColor: theme.base.infoBackgroundLight,
        };
      case 'info-light':
        return {
          color: '#0D9488',
          bgColor: '#F0FDFA',
        };
      case 'error-light':
        return {
          color: '#9D174D',
          bgColor: '#FCE7F3',
        };
      case 'purple':
        return {
          color: '#6B21A8',
          bgColor: '#F3E8FF',
        };
      case 'manual':
      default:
        return {
          color,
          bgColor,
        };
    }
  }

  return (
    <StyledChip
      variant={'outlined'}
      size={size}
      _color={colors['color']}
      _bgcolor={colors['bgColor']}
      min_width={minWidth}
      {...rest}
    >
      {children}
    </StyledChip>
  );
};

export default RoundedText;
