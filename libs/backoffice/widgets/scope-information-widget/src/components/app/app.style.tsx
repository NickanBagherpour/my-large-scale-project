import styled from 'styled-components';
import { Container } from '@oxygen/ui-kit';
import { ReturnButton as UiKitReturnButton } from '@oxygen/reusable-components';
import { respondTo } from '@oxygen/utils';

export const ReturnButton = styled(UiKitReturnButton)`
  min-width: 12.8rem;

  ${respondTo.down('sm')} {
    width: 100%;
  }
`;

export const AppContainer = styled(Container)`
  // background-color: pink;
`;
export const Footer = styled.div`
  display: flex;
  height: 7.2rem;
  align-items: center;
  justify-content: end;
  border-top: 1px solid ${(p) => p.theme.border._100};
  gap: 1.2rem;
  @media print {
    display: none;
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 2.4rem 0;
`;
