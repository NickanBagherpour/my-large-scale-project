import { Accordion as MuiAccordion } from '@mui/material';

import { cssVar, respondTo } from '@oxygen-portal/utils';

import styled from '@emotion/styled';

export const Accordion = styled(MuiAccordion)<any>`
  --gap: ${(p) => p.gap ?? '2.4rem'};

  background-color: ${(p) => p.theme.base.surface};
  /* border: 1px solid ${(p) => p.theme.base.borderLight}; */
  border-radius: var(${cssVar.radius});
  box-shadow: none;
  margin: var(--gap) 0;

  padding: ${(p) => {
    //console.log(p.expandend);
    return 'auto';
  }};

  p {
    line-height: 1;
  }

  &::before {
    height: 0;
  }

  &.Mui-expanded {
    /* border: 1px solid ${(p) => p.theme.base.border}; */
    border: none;
    box-shadow: none;
    margin: var(--gap) 0;
  }

  & .MuiAccordionSummary-root.Mui-expanded {
    //border-bottom: ${(p) => (p.expanded ? '1px' : '0')} solid ${(p) => p.theme.base.border};
    /* border-bottom: 1px solid ${(p) => p.theme.base.border}; */
    border-bottom: none;
    box-shadow: none;

    & .MuiAccordionSummary-content {
      margin: 1rem auto;
    }
  }

  & .MuiAccordionDetails-root {
    border: 1px solid ${(p) => p.theme.base.border};
    border-radius: var(${cssVar.radius});
    box-shadow: none;
  }

  & .MuiAccordionSummary-root {
    & .MuiAccordionSummary-content {
      display: flex;
      //justify-content: center;
      align-items: center;
      color: ${(p) => p.theme.base.primary};

      & .accordion-summary__icon {
        font-size: 2.4rem;
        display: flex;
      }

      & .accordion-summary__title {
        flex-grow: 1;
        margin: 0 0.8rem;
        font-size: 1.4rem;
        font-weight: 500;
      }

      & .accordion-summary__expand-button {
        font-size: 2.4rem;
        color: inherit;
      }
    }
  }
`;
