import { respondTo } from '@oxygen/utils';
import styled, { css } from 'styled-components';

function generateXs(props) {
  if (props.min_col > 1) return '';

  return css`
    ${respondTo.down('xs')} {
      grid-template-columns: 1fr;
    }
  `;
}

export const InfoBoxWrapper = styled.div<any>`
  margin: ${(p) => p.margin};
  display: grid;
  grid-template-columns: max(15%, 14rem) 1fr max(15%, 14rem) 1fr;
  column-gap: 1%;
  row-gap: ${(p) => (p.dense ? '1rem' : '2rem')};
  overflow: hidden;

  ${respondTo.down('lg')} {
    grid-template-columns: max(20%, 15rem) 1fr;
  }

  ${(p) => generateXs(p)}
  & .info-box__title {
    font-size: 1.4rem;
    font-weight: 500;
    color: ${(p) => p.theme.text.primary};
    white-space: ${(p) => (p.wrap ? 'unset' : 'nowrap')};
  }

  & .info-box__value-wrapper {
    display: flex;
    flex-direction: column;

    ${respondTo.down('lg')} {
      justify-self: end;
    }
  }

  & .fullwidth {
    grid-column: span 3;

    ${respondTo.down('md')} {
      grid-column: span 1;
    }
  }

  & .info-box__value {
    font-size: 1.4rem;
    font-weight: normal;
    color: ${(p) => p.theme.text.secondary};
    text-align: left;
    unicode-bidi: plaintext;
    /*! @noflip */
    direction: ltr;
  }

  & .info-box__sub-value {
    font-size: 1.3rem;
    font-weight: 300;
    color: ${(p) => p.theme.text.territory};
  }

  & .info-box__files {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    & > * {
      margin-right: 1rem;
    }

    // .ri-file-excel-line {
    //   color: ${(props) => props.theme.success.main};
    // }
    //
    // .ri-file-pdf-2-line {
    //   color: ${(props) => props.theme.error};
    // }
    //
    // .ri-image-line {
    //   color: ${(props) => props.theme.textSecendry};
    // }
    //
    // .ri-file-3-line {
    //   color: ${(props) => props.theme.text.primary};
    // }
  }

  & .info-box__footer {
    // background-color: ${(p) => p.theme.text.territory};
    //width: 100%;
    grid-column: 1 / -1;
    justify-self: flex-end;

    ${respondTo.down('sm')} {
      flex-flow: wrap;
      gap: 1rem;
      width: 100%;
    }

    & > * {
      margin-left: 1rem;
    }
  }
`;
