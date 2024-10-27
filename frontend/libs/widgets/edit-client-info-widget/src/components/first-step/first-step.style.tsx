import styled from 'styled-components';
import { respondTo } from '@oxygen/utils';

export const FirtStepContainer = styled.div`
  .form_wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .cards-title {
    font-weight: bold;
    font-size: 1.6rem;
  }

  .tag_input {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 1rem 0;

    .drop_down_input {
      display: flex;
      align-items: center;
      flex: 1;
      margin: 0.5rem;
      flex-wrap: nowrap;

      &::after {
        content: '';
        width: 1px;
        height: 4rem;
        margin-left: 1rem;
        background-color: ${(p) => p.theme.border.main};
      }
    }
  }

  .tags {
    width: max-content;
    margin: 0.5rem;
  }

  .grid {
    display: grid;
    grid-template-columns: 20rem auto;
    grid-template-rows: max-content auto;

    ${respondTo.down('sm')} {
      grid-auto-flow: column;
      grid-template-rows: 6rem auto;
    }

    .item1 {
      grid-column-start: 1;
      grid-column-start-end: 2;
      grid-column: auto;

      ${respondTo.down('sm')} {
        grid-row-start: 1;
        grid-row-end: 2;
        grid-column: auto;
      }

      button {
        width: 100%;
      }
    }

    .item2 {
      width: 100%;
      grid-column-start: 2;
      grid-column-end: 4;
      grid-row: auto;

      ${respondTo.down('sm')} {
        grid-column-start: 2;
        grid-column-end: 4;
        grid-column: auto;
        margin-bottom: 1rem;
      }

      padding: 0;
      flex-wrap: wrap;
    }
  }

  .label-switch {
    display: flex;
    align-items: end;

    div {
      gap: 1rem;
      display: flex;
      align-items: center;

      ${respondTo.down('md')} {
        align-items: start;
      }
    }
  }

  .seperator {
    margin-bottom: 1.6rem;
  }

  .footer {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
