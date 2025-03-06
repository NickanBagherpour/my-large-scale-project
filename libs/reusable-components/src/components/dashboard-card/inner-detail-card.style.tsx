import { cssVar } from '@oxygen/utils';
import styled from 'styled-components';

export const Title = styled.span`
  font-weight: 700;
  font-size: 1.8rem;
  padding-bottom: 0.4rem;
`;
export const Container = styled.div`
  background-color: ${(p) => p.theme.background._100};
  display: flex;
  flex-direction: column;
  border-radius: var(${cssVar.radius});
  padding: 1.5rem 1rem;
  flex-grow: 1;
`;
