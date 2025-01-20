import styled from 'styled-components';
import { Table as KitTable } from '@oxygen/ui-kit';

export const TableContainer = styled.div``;

export const Table = styled(KitTable)`
  tr {
    td.right-to-left {
      unicode-bidi: normal !important;
    }
  }
`;
