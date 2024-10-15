import React, { CSSProperties } from 'react';
import styled, { css } from 'styled-components';

import { useTr } from '@oxygen/translation';
import { Badge } from 'antd';

import { Button, ButtonProps } from './button';

export type FilterButtonProps = Omit<ButtonProps, 'type'> & {
  width?: CSSProperties['width'];
  active?: boolean;
  showBadge?: boolean;
};

const StyledBadge = styled<any>(Badge)`
  ${(props) => props.width && `min-width: ${props.width};`}

  .ant-badge-dot {
    width: 0.8rem;
    height: 0.8rem;
  }
`;

const StyledButton = styled<any>(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  // min-width: ${(p) => p.width};
  ${(props) => props.width && `min-width: ${props.width};`}
  font-size: 1.4rem;
  background-color: ${(p) => (p.active ? p.theme.background.main : 'inherit')};
  color: ${(p) => (p.active ? p.theme.primary.main : p.theme.text.territory)};
  border-color: ${(p) => (p.active ? p.theme.primary.main : p.theme.border.main)};

  i {
    font-size: 2rem;
    margin: 0;
  }
`;

export const FilterButton = (props: FilterButtonProps) => {
  const { children, active = false, width, showBadge = false, ...rest } = props;
  const [t] = useTr();

  return (
    <StyledBadge dot={showBadge} width={width} offset={[2, 2]} size={'default'}>
      <StyledButton type={'default'} active={active} width={width} {...rest}>
        {active ? <i className='ri ri-close-line' /> : <i className='ri ri-add-line' />}
        {t('button.filter')}
      </StyledButton>
    </StyledBadge>
  );
};
