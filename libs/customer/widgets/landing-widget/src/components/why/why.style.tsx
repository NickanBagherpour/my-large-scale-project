import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';

export const Cards = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;

  ${respondTo.down('md')} {
    flex-direction: column;
  }
`;
