import styled, { css } from 'styled-components';
import { Table as KitTable } from '@oxygen/ui-kit';
import { REVISION_TYPE } from '../../utils/consts';

export const TableContainer = styled.div``;

export const Table = styled(KitTable)`
  tr {
    td.right-to-left {
      unicode-bidi: normal !important;
    }
  }
`;

export const RevisionType = styled.span<any>`
  font-weight: 700;

  ${({ variant, isDeleted, theme }) => {
    switch (variant) {
      case REVISION_TYPE.ADD:
        return css`
          color: ${theme.secondary.main};
        `;

      case REVISION_TYPE.UPDATE:
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
