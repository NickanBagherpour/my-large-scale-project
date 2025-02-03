import styled, { css } from 'styled-components';
import { Table as KitTable } from '@oxygen/ui-kit';

export const TableContainer = styled.div``;

export const Table = styled(KitTable)`
  tr {
    td.right-to-left {
      unicode-bidi: normal !important;
    }
  }
`;

export const OperationTypeStyle = styled.p<any>`
  font-weight: 600;

  ${({ variant, isDeleted, theme }) => {
    switch (variant) {
      case 'ایجاد':
        return css`
          color: ${theme.secondary.main};
        `;

      case 'ویرایش':
        return isDeleted
          ? css`
              color: ${theme.error.main};
            `
          : css`
              color: ${theme.primary.main};
            `;
      default:
        return css`
          color: ${theme.primary.main};
        `;
    }
  }}
`;
