import styled from 'styled-components';
import { Table as UikitTable } from '@oxygen/ui-kit';

export const Table = styled(UikitTable)`
  & table {
    /* This will make expandable tabs responsive work */
    table-layout: fixed !important;
  }
`;
