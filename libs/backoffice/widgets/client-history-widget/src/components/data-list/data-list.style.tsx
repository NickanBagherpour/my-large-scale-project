import styled, { css } from 'styled-components';

import { Box } from '@oxygen/ui-kit';

import { REVISION_TYPE } from '../../utils/consts';

export const TableContainer = styled(Box)`
  height: 100%;

  //tr {
  td.right-to-left {
    unicode-bidi: normal !important;
  }
  //}

  //& tbody>tr>td{
  //  padding:0.6rem;
  //}
`;

export const RevisionType = styled.span<any>`
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

export const valueWrapper = styled.span`
  display: flex;
  justify-content: center;
  gap: 0.4rem;
  ${(p) =>
    p.theme.direction === 'rtl'
      ? css`
          direction: rtl !important;
        `
      : css`
          direction: ltr !important;
        `}
  unicode-bidi: embed !important;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
