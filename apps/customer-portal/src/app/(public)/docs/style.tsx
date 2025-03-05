import styled from 'styled-components';
import { cssVar } from '@oxygen/utils';

// Styled components for the API docs
export const ApiDocsContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;

  /* Custom styling for Stoplight Elements */

  .sl-font-prose, .sl-font-ui, .sl-prose {
    font-family: var(${cssVar.iransansFont});
  }


  .sl-code-highlight {
    text-align: end;
  }

  .sl-ml-16 {
    margin-left: 64px;
  }

  div[data-testid="two-column-right"].sl-relative {
    /*! @noflip */
    direction: ltr;
  }

  div.sl-overflow-y-auto > a[href^="https://stoplight.io"] {
    display: none;
  }

  div.sl-drawer a[href^="https://stoplight.io"] {
    display: none;
  }

  .sl-drawer.left {
    /*! @noflip */
    right: 0;
  }

  .TryItPanel, .sl-panel {
    /*! @noflip */
    direction: ltr;
  }


  .sl-prose ul:not(.contains-task-list) > li:before, .sl-prose ul:not(.contains-task-list) > ol > li:before {
    left: -1.6rem;
  }

  div.JsonSchemaViewer {
    /*! @noflip */
    direction: ltr;
  }


`;

export const Header = styled.header`
  background-color: #2a2f45;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;

  h1 {
    margin: 0;
    font-size: 1.5rem;
  }
`;

export  const Main = styled.main`
  flex: 1;
  overflow: hidden;
`;

export const Container = styled.div`

  min-height: 100vh;
  display: flex;

  div[id^="mosaic-provider-react-aria"] {
    flex: 1;
    height: unset !important;
  }

  .sl-font-prose, .sl-font-ui, .sl-prose {
    font-family: var(${cssVar.iransansFont});
  }

  . sl-code-highlight {
    text-align: end;
  }

  .sl-ml-16 {
    margin-left: 64px;
  }

  div[data-testid="two-column-right"].sl-relative {
    /*! @noflip */
    direction: ltr;
  }

  div.sl-overflow-y-auto > a[href^="https://stoplight.io"] {
    display: none;
  }

  div.sl-drawer a[href^="https://stoplight.io"] {
    display: none;
  }

  .sl-drawer.left {
    /*! @noflip */
    right: 0;
  }

  .TryItPanel, .sl-panel {
    /*! @noflip */
    direction: ltr;
  }

`;
