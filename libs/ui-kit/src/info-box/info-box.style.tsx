import { cssVar, respondTo } from '@oxygen/utils';
import styled, { css } from 'styled-components';

function setResponsiveGridColmns(props) {
  const min_col = props.min_col;

  let xlMin = min_col > 4 ? min_col - 2 : min_col - 1;
  let lgMin = xlMin > 2 ? xlMin - 1 : 2;

  return css`
    grid-template-columns: repeat(${min_col}, 1fr);

    ${respondTo.down('xl')} {
      grid-template-columns: repeat(${xlMin}, 1fr);
    }
    ${respondTo.down('lg')} {
      grid-template-columns: repeat(${lgMin}, 1fr);
    }
    ${respondTo.down('xs')} {
      grid-template-columns: 1fr;
    }
  `;
}

export const InfoBoxWrapper = styled.div<{ min_col: number; margin?: string | number; dense?: string; wrap?: string }>`
  margin: ${(p) => p.margin ?? ''};
  display: grid;

  ${(p) => setResponsiveGridColmns(p)}

  background-color: ${(p) => p.theme.background._50};
  border: 1px solid ${(p) => p.theme.border._100};
  border-radius: var(${cssVar.radius});
  padding: 3rem;
  column-gap: 1%;
  row-gap: ${(p) => (p.dense === 'true' ? '1rem' : '2rem')};
  overflow: hidden;

  .ant-tag {
    width: fit-content;
    padding: 0.3rem 0.8rem;
    border-radius: 25px;
    background-color: ${(p) => p.theme.primary._100};
    color: ${(p) => p.theme.text.primary};
  }

  & .info-box__title {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: ${(p) => p.theme.text.primary};
    white-space: ${(p) => (p.wrap === 'true' ? 'unset' : 'nowrap')};
    display: block;
  }

  & .grid-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & .info-box__value-wrapper {
      display: flex;
      flex-direction: column;
      text-align: left;
      // width: 100%;

      & .info-box__value {
        font-size: 1.4rem;
        font-weight: normal;
        color: ${(p) => p.theme.text.secondary};
        // text-align: left;
        unicode-bidi: plaintext;
        // direction: ltr;
      }

      & .info-box__sub-value {
        font-size: 1.3rem;
        font-weight: 300;
        color: ${(p) => p.theme.text.tertiary};
      }
    }

    & .info-box__files {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      & > * {
        margin-right: 1rem;
      }
    }
  }

  & .fullwidth {
    grid-column: 1 / -1;
    display: block;
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
