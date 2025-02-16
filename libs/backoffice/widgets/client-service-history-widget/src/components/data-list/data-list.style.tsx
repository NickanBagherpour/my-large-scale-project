import styled, { css } from 'styled-components';
import { Table as KitTable } from '@oxygen/ui-kit';
import { REV_TYPE_CODE } from '../../utils/consts';

export const TableContainer = styled.div``;

export const Table = styled(KitTable)`
  tr {
    td.right-to-left {
      unicode-bidi: plaintext !important;
    }
  }
`;

export const OperationTypeStyle = styled.p<any>`
  font-weight: 600;

  ${({ variant, $isDeleted, theme }) => {
    switch (variant) {
      case REV_TYPE_CODE.ADD:
        return css`
          color: ${theme.secondary.main};
        `;

      case REV_TYPE_CODE.UPDATE:
        return $isDeleted
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
