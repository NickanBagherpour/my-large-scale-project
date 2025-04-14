import { Container as KitContainer } from '@oxygen/ui-kit';
import { cssVar, respondTo } from '@oxygen/utils';
import styled from 'styled-components';
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: var(${cssVar.radiusLg});
  background-color: ${(p) => p.theme.surface};
  ${respondTo.between('md', 'xs')} {
    flex-direction: row;
  }
`;
