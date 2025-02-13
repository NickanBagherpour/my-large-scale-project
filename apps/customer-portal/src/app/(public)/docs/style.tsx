import styled from 'styled-components';
import { cssVar } from '@oxygen/utils';

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

  .TryItPanel , .sl-panel {
    /*! @noflip */
    direction: ltr;
  }

`;
