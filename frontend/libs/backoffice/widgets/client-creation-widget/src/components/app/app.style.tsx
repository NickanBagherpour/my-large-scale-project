import { Container, Steps as OxegenSteps } from '@oxygen/ui-kit';
import styled from 'styled-components';

export const AppContainer = styled(Container)``;
export const Steps = styled(OxegenSteps)`
  margin-top: 2.4rem;
`;
export const Footer = styled.div`
  display: flex;
  height: 7.2rem;
  align-items: center;
  justify-content: end;
  border-top: 1px solid ${(p) => p.theme.border._100};
  gap: 1.2rem;
`;
