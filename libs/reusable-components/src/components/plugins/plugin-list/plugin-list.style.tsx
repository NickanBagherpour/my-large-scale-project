import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  ${respondTo.down('sm')} {
    flex-direction: column;
  }
`;
