import styled from 'styled-components';
import { respondTo } from '@oxygen/utils';

export const PageTitle = styled.div`
  font-weight: 700;
  font-size: 1.8rem;
  padding: 0.7rem 1.6rem 0.7rem 1.6rem;
`;
export const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  gap: 1rem;
  ${respondTo.down('lg')} {
    /* grid-template-rows: repeat(3, 1fr); */
    grid-template-columns: 1fr;
  }
  ${respondTo.between('xxl', 'lg')} {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: rows;
  }
`;
export const StackedCards = styled.div`
  display: grid;
  grid-template-rows: minmax(20px, 1fr) minmax(20px, 1fr);
  gap: 1rem;
  ${respondTo.between('xxl', 'lg')} {
    grid-template-columns: minmax(20px, 1fr) minmax(20px, 1fr);
    grid-template-rows: auto;
    grid-column: 1 / span 2;
  }
  ${respondTo.down('lg')} {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(180px, 1fr) minmax(180px, 1fr);
  }
`;
