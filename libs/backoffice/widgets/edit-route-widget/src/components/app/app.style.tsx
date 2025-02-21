import styled from 'styled-components';
import { Container } from '@oxygen/ui-kit';

export const AppContainer = styled(Container)`
  & > div:nth-child(2) {
    margin-bottom: 2rem;
  }
`;

export const Title = styled.h3`
  color: ${(p) => p.theme.text.primary};
  font-size: 1.6rem;
  font-weight: 600;
`;
