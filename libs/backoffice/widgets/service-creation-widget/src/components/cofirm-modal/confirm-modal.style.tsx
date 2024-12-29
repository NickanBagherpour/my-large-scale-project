import styled from 'styled-components';
import { Modal as UiKiModal } from '@oxygen/ui-kit';

export const Modal = styled(UiKiModal)`
  .ok-button {
    background: ${(p) => p.theme.secondary.main};
    &:hover {
      opacity: 0.8;
    }
  }
  .cancel-button {
    color: ${(p) => p.theme.primary.main};
  }
`;

export const Txt = styled.p`
  color: ${(p) => p.theme.text.primary};
  font-size: 1.6rem;
  font-weight: 600;
`;
