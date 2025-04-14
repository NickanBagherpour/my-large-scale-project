import styled from 'styled-components';
import { Container } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';

export const AppContainer = styled(Container)`
  // background-color: pink;
`;
export const PageTitle = styled.div`
  font-weight: 700;
  font-size: 1.8rem;
  padding: 0.7rem 1.6rem 0.7rem 1.6rem;
`;
export const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  gap: 1rem;
  width: 100%;
  ${respondTo.down('md')} {
    grid-template-columns: 1fr 1fr;
  }
  ${respondTo.down('xs')} {
    grid-template-columns: 1fr;
  }
`;
export const StackedCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ${respondTo.between('md', 'xs')} {
    flex-direction: row;
  }
`;
