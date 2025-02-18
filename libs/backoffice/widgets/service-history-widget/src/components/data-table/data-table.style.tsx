import styled, { css } from 'styled-components';

import { REVISION_TYPE } from '../../utils/consts';

export const TableContainer = styled.div`
  height: 100%;
  /* & td.left-to-right {
    direction: ${(props) => props.theme.direction};
  }
  & td.right-to-left {
    direction: ${(props) => (props.theme.direction === 'rtl' ? 'ltr' : 'rtl')};
  } */
`;

export const RevisionType = styled.p<any>`
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

export const NoResultContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;
