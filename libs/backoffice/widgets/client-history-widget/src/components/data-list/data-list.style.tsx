import styled, { css } from 'styled-components';

import { Box } from '@oxygen/ui-kit';

import { REVISION_TYPE } from '../../utils/consts';

export const TableContainer = styled(Box)`
  height: 100%;

  tr {
    td.right-to-left {
      unicode-bidi: normal !important;
    }
  }
`;

export const RevisionType = styled.p<any>`
  font-weight: 700;

  ${({ variant, $isdeleted, theme }) => {
    switch (variant) {
      case REVISION_TYPE.ADD:
        return css`
          color: ${theme.secondary.main};
        `;

      case REVISION_TYPE.UPDATE:
        return $isdeleted
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
