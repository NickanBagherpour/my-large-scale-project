import styled from 'styled-components';
import { Table as KitTable } from '@oxygen/ui-kit';

export const DataTableContainer = styled.div``;

export const Table = styled(KitTable)``;

export const TableRow = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RowItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  color: ${(p) => p.theme.text.secondary};
  min-height: 5rem;
  gap: 2rem;

  & > button {
    /* to align buttons with other elements */
    //margin-inline-end: -15px;
  }
`;
