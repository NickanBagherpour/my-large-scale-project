import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  gap: 1.2rem;
  padding: 1.5rem 1rem 1rem 0rem !important;
  grid-template-columns: repeat(2, 1fr);
  ${respondTo.down('md')} {
    grid-template-columns: 1fr;
  }
`;
