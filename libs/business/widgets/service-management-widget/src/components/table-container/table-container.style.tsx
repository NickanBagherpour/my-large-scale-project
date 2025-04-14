import styled from 'styled-components';
import { Table as KitTable, Select } from '@oxygen/ui-kit';

export const TableContainer = styled.div``;
export const Table = styled(KitTable)``;
export const CustomeSelect = styled(Select)<{ $isCommercial: boolean }>`
  .ant-select-selector {
    border-color: ${(p) => (p.$isCommercial ? p.theme.info._300 : p.theme.warning._300)};
  }
  background-color: ${(p) => (p.$isCommercial ? p.theme.info._50 : p.theme.warning._50)};
  min-width: 12rem;
`;
