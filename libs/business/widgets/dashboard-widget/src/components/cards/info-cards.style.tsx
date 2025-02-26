import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  gap: 1.5rem;
  padding: 1.5rem 1rem;
  grid-template-columns: repeat(2, 1fr);
  ${respondTo.down('sm')} {
    grid-template-columns: 1fr;
  }
`;
