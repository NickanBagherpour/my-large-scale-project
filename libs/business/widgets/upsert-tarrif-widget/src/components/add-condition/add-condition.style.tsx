import { Button as UikitButton } from '@oxygen/ui-kit';
import styled from 'styled-components';

export const Button = styled(UikitButton)`
  background: ${(p) => p.theme.background.main};
  border-radius: 16rem;
  border: ${(p) => `1px dashed ${p.theme.secondary.main}`};
  background: ${(p) => p.theme.background.main};
  font-size: 1.4rem;
  i {
    font-size: 1.8rem;
  }
`;
