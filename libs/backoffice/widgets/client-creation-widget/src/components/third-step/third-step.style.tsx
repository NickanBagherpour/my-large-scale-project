import styled from 'styled-components';
import { ReturnButton as UiKitReturnButton } from '@oxygen/reusable-components';
import { respondTo } from '@oxygen/utils';
import { Button } from '@oxygen/ui-kit';

export const ThirdStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
export const Footer = styled.div`
  display: flex;
  height: 7.2rem;
  align-items: center;
  justify-content: end;
  border-top: 1px solid ${(p) => p.theme.border._100};
  gap: 1.2rem;
  ${respondTo.down('sm')} {
    flex-direction: column;
  }
`;

export const ReturnButton = styled(UiKitReturnButton)`
  min-width: 12.8rem;
  ${respondTo.down('sm')} {
    width: 100%;
  }
`;
export const RegisterButton = styled(Button)`
  ${respondTo.down('sm')} {
    width: 100%;
    order: -1;
  }
`;
