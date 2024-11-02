import { Container } from '@oxygen/ui-kit';
import styled from 'styled-components';

export const HistoryContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;
export const TableContainer = styled.div`
  flex-grow: 1;
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 1rem;
  & .btn-return {
    min-width: 12rem;
    margin: 0 1rem 3rem;
  }
`;
