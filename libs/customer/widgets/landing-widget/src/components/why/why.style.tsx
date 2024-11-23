import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';
import { SectionTitle } from '../section-title/section-title.style';

export const Title = styled(SectionTitle)`
  margin-bottom: 6.4rem;
`;

export const Cards = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;

  ${respondTo.down('md')} {
    flex-direction: column;
  }
`;
