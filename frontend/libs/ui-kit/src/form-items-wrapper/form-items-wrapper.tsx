import { respondTo } from '@oxygen-portal/utils';
import styled from '@emotion/styled';

export const FormItemsWrapper = styled.div`
  --column-gap: 0.8rem;

  display: grid;
  grid-template-columns: repeat(12, 1fr);

  grid-column-gap: var(--column-gap);
  grid-row-gap: 1.6rem;

  & .normal-width {
    grid-column: span 3;

    //Responsive
    ${respondTo.down('md')} {
      grid-column: span 6;
    }

    ${respondTo.down('sm')} {
      grid-column: span 12;
    }
  }

  & .half-width {
    grid-column: span 6;

    //Responsive
    ${respondTo.down('md')} {
      grid-column: span 6;
    }

    ${respondTo.down('sm')} {
      grid-column: span 12;
    }
  }

  & .triple-width {
    grid-column: span 4;

    //Responsive
    ${respondTo.down('md')} {
      grid-column: span 6;
    }

    ${respondTo.down('sm')} {
      grid-column: span 12;
    }
  }

  & .button-container {
    //margin: 2.8rem 0 0 0;
    grid-column: span 12;
    justify-self: flex-end;

    & > * {
      margin-left: var(--column-gap);
    }
  }
`;
