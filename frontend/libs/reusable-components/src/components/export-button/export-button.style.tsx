import { Button as KitButton } from '@oxygen/ui-kit';

import styled from 'styled-components';

export const Button = styled(KitButton)`
  border: none !important;
  padding: 0.7rem;
  &:disabled i {
    opacity: 0.5;
  }
`;

export const ExcelIcon = styled.i`
  color: ${(p) => (p.theme as any).base.success};
  font-size: 2.4rem;
`;

export const PdfIcon = styled.i`
  color: ${(p) => (p.theme as any).base.error};
  font-size: 2.4rem;
`;
