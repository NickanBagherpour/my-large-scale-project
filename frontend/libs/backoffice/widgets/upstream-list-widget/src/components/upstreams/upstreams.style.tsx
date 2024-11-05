import styled from 'styled-components';

import { respondTo } from '@oxygen/utils';
import { Button } from '@oxygen/ui-kit';

export const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.6rem;
  margin-bottom: 2.4rem;

  ${respondTo.down('xxl')} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${respondTo.down('xl')} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${respondTo.down('lg')} {
    grid-template-columns: repeat(1, 1fr);
  }

  & header[class*='grid-card-style__Header'] {
    gap: 4rem;
    min-height: 5rem;
    align-items: flex-start;
  }

  & span[class*='grid-card-style__Title'] {
    font-weight: 500;
    text-wrap: wrap;
    line-height: 2.5rem;
    text-align: ${(props) => (props.theme.direction === 'rtl' ? 'right' : 'left')};
  }

  & i[class*='grid-card-style__Settings'] {
    margin-inline-start: 0;
  }

  & p[class*='grid-card-style__Status'] {
    font-size: 12px;
    font-weight: 400;
  }

  & footer[class*='grid-card-style__Footer'] {
    margin-top: 0.2rem;
  }
`;

export const StyledButton = styled(Button)`
  display: flex;
  gap: 1rem;
  margin-inline: auto;
  font-weight: 500;

  & i {
    font-size: 1.8rem;
  }
`;
