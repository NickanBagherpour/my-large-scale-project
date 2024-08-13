import { cssVar, respondTo } from '@oxygen-portal/utils';

import styled from '@emotion/styled';

export const InfoBoxWrapper = styled.section<any>`
  --gap: 1.6rem;

  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  border: ${(p) => (p.bordered ? '1px' : '0px')} solid ${(p) => p.theme.base.border};
  border-radius: var(${cssVar.radius});
  padding: 2.4rem;

  .infobox__container {
    display: flex;
    flex-direction: row;
    gap: calc(var(--gap) + 0.6rem);
    justify-content: center;
    //align-items: center;
  }

  .infobox__data-container {
    display: grid;
    grid-template-columns: repeat(${(p) => p.cols}, 1fr);
    gap: var(--gap);
    flex-grow: 1;

    ${respondTo.down('md')} {
      grid-template-columns: repeat(${(p) => p.cols - 1}, 1fr);
    }

    ${respondTo.down('sm')} {
      /* grid-template-columns: repeat(1, 1fr); */
      display: flex;
      flex-direction: column;
    }

    /* ${respondTo.down('xs')} {
      grid-template-columns: 1fr 1fr;
    } */
  }

  .infobox__item {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .infobox__item--full {
    grid-column: span 2;
  }

  .infobox__item__title {
    font-weight: bold;
    font-size: 12px;
  }

  .infobox__item__value {
    font-weight: 300;
    font-size: 14px;
    margin-top: 0.5rem;

    .error-icon {
      color: ${(p) => p.theme.base.error};
      font-size: 2.4rem;
    }
  }

  .infobox__footer {
    margin-top: 1rem;
  }
`;
