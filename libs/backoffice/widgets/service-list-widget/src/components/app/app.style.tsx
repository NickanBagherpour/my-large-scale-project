import styled from 'styled-components';
import { Container, MarkText } from '@oxygen/ui-kit';

export const ServicesContainer = styled(Container)`
  padding-bottom: 2rem;
`;

export const AppContainer = styled.div`
  // background-color: pink;
`;

export const ModalMessage = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.5rem;
  align-items: center;

  .delete-modal {
    background-color: red;
  }
`;

export const ServiceName = styled(MarkText)`
  margin: 0.4rem;
`;
