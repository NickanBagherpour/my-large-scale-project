import styled, { css } from 'styled-components';
import Link from 'next/link';

import { Box, Table as KitTable } from '@oxygen/ui-kit';

import { SERVICE_STATUS_LIST } from '../../utils/consts';

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

export const TableLink = styled(Link)`
  color: ${(p) => p.theme.primary.main};
  font-size: 1.4rem;
`;

export const StatusContainer = styled.p<any>`
  font-weight: 700;

  ${({ status, theme }) => {
    switch (status) {
      case SERVICE_STATUS_LIST.ACTIVE:
        return css`
          color: ${theme.secondary.main};
        `;

      case SERVICE_STATUS_LIST.INACTIVE:
        return css`
          color: ${theme.error.main};
        `;

      default:
        return css`
          color: ${theme.primary.main};
        `;
    }
  }}
`;
