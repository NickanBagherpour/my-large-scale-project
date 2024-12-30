import styled from 'styled-components';
import { respondTo } from '@oxygen/utils';

export const InfoBoxContainer = styled.div<{ isConfirmed: boolean }>`
  & > div:first-of-type {
    //margin: 1.6rem 0;
    border: 0;
    background-color: transparent;
    line-height: 1.8rem;
    padding: 0;
    margin: 0;
    grid-template-columns: 1fr 3fr;
    grid-auto-rows: auto auto;
    column-gap: 0.8rem;

    .grid-item .info-box__title {
      font-size: 1.2rem;
      font-weight: 700;
      line-height: 1.8rem;

      color: ${(p) => (p.isConfirmed ? p.theme.secondary._800 : '#991B1B')};
    }

    .grid-item .info-box__value {
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 1.8rem;
      color: ${(p) => (p.isConfirmed ? p.theme.secondary.main : p.theme.error._600)};
    }

    .grid-item:nth-child(2) {
      grid-row: span 2;

      ${respondTo.between('lg', 'md')} {
        grid-row: auto;
        order: 999;
      }

      ${respondTo.down('md')} {
        order: 999;
      }
    }

    ${respondTo.down('lg')} {
      grid-template-columns: minmax(0, 60%) 1fr;
    }

    ${respondTo.down('sm')} {
      grid-template-columns: 1fr;
    }
  }
`;
