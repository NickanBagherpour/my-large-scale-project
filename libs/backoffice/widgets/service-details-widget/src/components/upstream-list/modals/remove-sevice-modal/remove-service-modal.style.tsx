import { MarkText as KitMarkText, Button as KitButton, Modal as KitModal } from '@oxygen/ui-kit';
import styled from 'styled-components';
import { respondTo } from '@oxygen/utils';

export const MarkText = styled(KitMarkText)`
  font-weight: 600;
  color: ${(p) => p.theme.text.primary};
  font-size: 1.6rem;
`;

export const Modal = styled(KitModal)`
  width: 50% !important;
  ${respondTo.down('sm')} {
    width: 95% !important;
  }
`;
