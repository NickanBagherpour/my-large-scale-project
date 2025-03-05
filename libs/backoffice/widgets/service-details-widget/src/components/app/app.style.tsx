import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';
import { Container } from '@oxygen/ui-kit';
import { ReturnButton as UiKitReturnButton } from '@oxygen/reusable-components';

export const ReturnButton = styled(UiKitReturnButton)`
  min-width: 12.8rem;

  ${respondTo.down('sm')} {
    width: 100%;
  }
`;

export const AppContainer = styled(Container)`
  min-height: 100%;
`;

export const CaptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.8rem;
  margin-bottom: 1rem;
  margin-inline-start: 1rem;
  font-weight: 600;
  ${respondTo.down('md')} {
    display: block;
  }

  .btn-group {
    display: flex;
    gap: 1.5rem;
  }

  .icon-export {
    font-size: 3rem !important;
    color: ${(p) => p.theme.text.quaternary};
  }
`;
