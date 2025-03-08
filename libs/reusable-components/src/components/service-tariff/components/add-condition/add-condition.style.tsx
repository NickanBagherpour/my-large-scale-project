import { Button as UikitButton } from '@oxygen/ui-kit';
import styled, { css } from 'styled-components';
import { TariffType } from '../../type';

export const Button = styled(UikitButton)<{ $tariffType: TariffType }>`
  border-radius: 16rem;
  background: ${(p) => p.theme.background.main};
  font-size: 1.4rem;
  width: 100%;
  height: 6.4rem;

  &:disabled {
    display: none;
  }

  i {
    font-size: 1.8rem;
  }

  ${(p) => {
    if (p.$tariffType === 'tiered') {
      return css`
        color: ${p.theme.secondary.main} !important;
        border: ${(p) => `1px dashed ${p.theme.secondary.main}`};
      `;
    } else {
      return css`
        color: ${p.theme.warning.main} !important;
        border: ${() => `1px dashed ${p.theme.warning.main}`};
      `;
    }
  }}
`;
