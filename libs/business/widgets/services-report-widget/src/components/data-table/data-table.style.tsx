import styled from 'styled-components';

import { Box, Table as KitTable } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';

export const TableContainer = styled(Box)`
  height: 100%;
`;

export const Table = styled(KitTable)`
  & .ant-pagination-options {
    margin-inline-start: 1.6rem;
  }

  & tbody > tr:has(.ant-btn-color-secondary) > td {
    border-bottom: 1px solid ${(p) => p.theme.success.main};
    background-color: ${(p) => p.theme.success._50};
  }
`;

export const StatusContainer = styled.p<{ $status: boolean }>`
  font-weight: 700;
  color: ${(p) => (p.$status ? p.theme.secondary.main : p.theme.error.main)};
`;

export const ActionBox = styled(Box)`
  display: flex;
  justify-content: center;
  margin-inline-end: 2rem;
  gap: 1rem;

  ${respondTo.down('md')} {
    margin-inline-end: 0;
  }
`;
