import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.6rem;

  ${respondTo.down('xxl')} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${respondTo.down('xl')} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${respondTo.down('lg')} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default Grid;
