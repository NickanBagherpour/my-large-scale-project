import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3.6rem;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding-inline: 0.8rem;
  margin-bottom: 1.6rem;

  ${respondTo.down('sm')} {
    flex-direction: column;
  }
`;

export const TabName = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  margin-inline-end: auto;
  margin-block: 0;
`;

export const Chips = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  &&& > * {
    margin: 0;
  }
`;

export const Btns = styled.div`
  display: flex;
  gap: 2rem;

  ${respondTo.down('sm')} {
    justify-content: space-between;
    width: 100%;
  }
`;

export const Icon = styled.i`
  font-size: 1.8rem;
`;
