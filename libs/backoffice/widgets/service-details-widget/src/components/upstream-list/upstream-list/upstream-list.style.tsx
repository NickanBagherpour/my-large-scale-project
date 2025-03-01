import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';

export const Title = styled.p`
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2.5rem; /* 156.25% */
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0.8rem;
  margin-bottom: 0.8rem;
  align-items: center;
  ${respondTo.down('sm')} {
    flex-direction: column;
    align-items: start;
    Button {
      width: 100%;
    }
  }
`;
export const Icon = styled.i`
  font-size: 1.8rem;
`;
