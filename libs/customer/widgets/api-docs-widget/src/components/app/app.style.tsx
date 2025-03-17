import styled from 'styled-components';
import { Container } from '@oxygen/ui-kit';

export const AppContainer = styled(Container)`
  // background-color: pink;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

export const RedocContainer = styled.div`
  flex: 1;
  overflow: auto;
`;

export const ErrorMessage = styled.div`
  padding: 2rem;
  color: #e53935;
  text-align: center;
  font-weight: 500;
`;
