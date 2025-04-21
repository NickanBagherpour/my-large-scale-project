import styled from 'styled-components';
import { cssVar } from '@oxygen/utils';
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.5rem;
  border-radius: var(${cssVar.radiusLg});
  background-color: ${(p) => p.theme.surface};
  width: 100%;
`;
