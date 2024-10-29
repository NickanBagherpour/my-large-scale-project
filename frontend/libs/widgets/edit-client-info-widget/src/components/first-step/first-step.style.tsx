import styled from 'styled-components';
import { respondTo } from '@oxygen/utils';

export const FirtStepContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  .form_wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .tags {
    width: max-content;
    margin: 0.5rem;
  }

  .grid {
    display: grid;
    grid-template-columns: 20rem 2rem auto;
    grid-template-rows: max-content auto;
    align-items: flex-start;

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

        .ant-space {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
      }
    }

    .line {
      background-color: ${(p) => p.theme.border.main};
      margin-left: 1rem;
      width: 0.1rem;
      height: 4rem;
      grid-column-start: 2;
      grid-column-start-end: 3;

      ${respondTo.down('md')} {
        height: 5rem;
      }
    }

    .item2 {
      width: 100%;
      grid-column-start: 3;
      grid-column-end: 5;
      grid-row: auto;

      ${respondTo.down('sm')} {
        grid-column-start: 2;
        grid-column-end: 4;
        grid-column: auto;
        margin-bottom: 1rem;
      }

      .style-icon {
        font-size: 1.4rem;
        color: ${(p) => p.theme.text.primary};
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

  .footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px solid ${(p) => p.theme.border.main};
    gap: 1rem;
    padding: 1.5rem 0;

    ${respondTo.down('sm')} {
      flex-direction: column;

      button {
        width: 100%;

        &:first-of-type {
          order: 1;
        }
      }
    }
  }
`;

export const Footer = styled.div``;
