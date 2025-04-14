import { cssVar } from '@oxygen/utils';
import styled from 'styled-components';
export const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: var(${cssVar.radiusLg});
  background-color: ${(p) => p.theme.surface};
  max-width: 100%;
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;
`;
