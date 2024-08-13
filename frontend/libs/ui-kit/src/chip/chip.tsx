import { Chip as MuiChip, ChipProps as MuiChipProps, css, styled } from '@mui/material';
import React from 'react';

export type ChipProps = MuiChipProps & {
  active?: boolean;
  onDelete?: (event: React.MouseEvent<HTMLElement>) => void;
};

const StyledChip = styled(MuiChip)<any>`
  padding: 0 1.3rem;
  height: 3.4rem;
  direction: rtl;

  color: ${(p) => (p.onDelete ? p.theme.base[p.color] : '')};
  background-color: ${(p) => (p.onDelete ? p.theme.base[p.color] + '20' : '')};
  border: 1px solid ${(p) => (p.onDelete ? p.theme.base[p.color] : '')};
  color: ${(p) => (p.active === 'true' ? p.theme.base.primary : '')};
  background-color: ${(p) => (p.active === 'true' ? p.theme.base.infoBackgroundLight : '')};
  border: 1px solid ${(p) => (p.active === 'true' ? p.theme.base.primary : '')};
`;

const Chip: React.FC<ChipProps> = (props) => {
  const { children, variant = 'outlined', icon, active = false, ...rest } = props;
  let otherAttr = {};
  if (active) {
    otherAttr = {
      variant: active ? 'filled' : 'outlined',
      // icon: active ? activeIcon : props?.icon,
      // background: active ? 'primary' : 'inherit',
    };
  }

  return (
    <StyledChip variant={variant} active={active.toString()} {...otherAttr} {...rest}>
      {children}
    </StyledChip>
  );
};

export default Chip;
