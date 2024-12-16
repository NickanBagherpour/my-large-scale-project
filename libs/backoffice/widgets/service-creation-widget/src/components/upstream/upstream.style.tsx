import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem 1.6rem;

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

export const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${(p) => p.theme.text.primary};
  margin-block: 2.85rem 2.65rem;
`;
