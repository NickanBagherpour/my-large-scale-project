import { cssVar, respondTo } from '@oxygen/utils';
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
  grid-template-columns: 1fr 1fr 1fr 1fr;
  background-color: ${(p) => p.theme.cardColor};
  border: 2px solid ${(p) => p.theme.background._200};
  border-radius: 12px;
  padding: 3rem;
  column-gap: 1%;
  row-gap: ${(p) => (p.dense ? '1rem' : '2rem')};
  overflow: hidden;

  .ant-tag {
    width: fit-content;
    padding: 0.3rem 0.8rem;
    border-radius: 25px;
    background-color: ${(p) => p.theme.primary._100};
    color: ${(p) => p.theme.text.primary};
  }

  ${respondTo.down('lg')} {
    grid-template-columns: max(20%, 15rem) 1fr;
  }

  ${(p) => generateXs(p)}

  & .info-box__title {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: ${(p) => p.theme.text.primary};
    white-space: ${(p) => (p.wrap ? 'unset' : 'nowrap')};
    display: block;
  }

  & .info-box__value-wrapper {
    flex-direction: column;

    ${respondTo.down('lg')} {
      justify-self: end;
    }
  }

  & .fullwidth {
    grid-column: 1 / -1;
    display: block;
    Ensure block display ${respondTo.down('md')} {
      grid-column: 1 / -1;
    }
  }

  & .info-box__value {
    font-size: 1.4rem;
    font-weight: normal;
    color: ${(p) => p.theme.text.secondary};
    text-align: left;
    unicode-bidi: plaintext;
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
  }

  & .info-box__footer {
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
