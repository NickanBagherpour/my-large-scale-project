import styled, { createGlobalStyle } from 'styled-components';
import { cssVar } from '@oxygen/utils';

const direction = 'rtl';
const directionRTL = 'ltr';

// Global styles to override Redoc's default styles
export const RedocGlobalStyles = createGlobalStyle`
  /* Keep code blocks ${direction} */
  .redoc-wrap pre,
  .redoc-wrap code,
  .redoc-wrap .token-line,
  .redoc-wrap [data-language] {
    direction: ${direction} !important;
    text-align: right !important;
    font-family: monospace !important;
  }

  /* Fix request samples and response examples */
  .redoc-wrap div[data-section-id] {
    div[class*="ApiInfo"] {
      direction: ${directionRTL};
    }

    div[class*="SampleControls"] {
      direction: ${direction};
      justify-content: flex-start;
    }
  }

  /* Fix sidebar menu */
  .redoc-wrap ul[role="menu"] {
    direction: ${directionRTL};
    text-align: left;

    li[role="menuitem"] {
      label {
        padding: 12px;
        text-align: left;

        svg {
          transform: rotateZ(90deg);
        }
      }

      button {
        text-align: left;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;

        svg {
          transform: scaleX(-1);
        }
      }

    }
  }


  ul[role="menu"] + div {
    display: none;
  }

    /* Fix tabs in left panel */
  .redoc-wrap ul.react-tabs__tab-list[role="tablist"] {
    direction: ${directionRTL};

    > li[role="tab"] {
      padding: 3px 2px;
      font-size: 12px;
    }
  }

  /* Fix method badges (GET, POST, etc.) */
  .redoc-wrap [class*="OperationBadge"] {
    direction: ${direction};
    text-align: center;
  }

  /* Fix endpoint URLs */
  .redoc-wrap [data-section-id] [class*="OperationEndpoint"] {
    direction: ${direction};
    text-align: right;
  }
  button[disabled]::before {
    display: none
  }

  button {
    /*! @noflip */
    direction: ltr;
    text-align-last: start;
    gap: 1rem;

    svg:not(table svg) {
      margin-left: 0px !important;
      margin-right: -25px !important;
    } 
  }


  div[role="button"] {
    font-size: 12px;
    text-align: end;
  }

  .redoc-json {
    /*! @noflip */
    direction: ltr;
    text-align: start;
  }

  .collapsible {
    margin-inline: 2em 0 !important;
  }

  .collapser {
    inset-inline-start: -1.5em !important;
  }
/* .kZsbKD {
  text-align: right!important;

} */
     caption {
      text-align: right!important;
    }

  h5 /* h5:has(~ table) */ {
    /*! @noflip */
    direction: ltr;
    text-align: start;
  }

  .redoc-wrap.redoc-wrap table {
    /*! @noflip */
    direction: ltr;
    text-align: start;

 

    td[kind="field"] {
      padding-inline-start: 0;
      padding-inline-end: 10px;
      text-align: start;

      & > span:first-child {
        margin-inline-end: 10px;
        margin-inline-start: 0;
      }

      & > div {
        margin-inline-start: 20px;
      }
    }

    td {
      background-position: right top;
      border-inline-end: none;
    }

    tr:not(:is(:first-child, :last-child)) > td:first-of-type {
      border-inline-start: 1px solid rgb(124, 124, 187);
    }
  }

  td p {
    unicode-bidi: plaintext;
  }
`;

export const StyledRedocContainer = styled.div`
  height: 100%;
  width: 100%;
  font-family: var(${cssVar.iransansFont}), system-ui, sans-serif;

  /* Main container */

  .redoc-wrap {
    direction: ${directionRTL};

    /* Customize scrollbars for better ${directionRTL} experience */

    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
`;
