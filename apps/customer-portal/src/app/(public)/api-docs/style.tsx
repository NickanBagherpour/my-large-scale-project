import styled from 'styled-components';
import { cssVar } from '@oxygen/utils';


const direction = 'ltr';

// RTL-compatible container with direction set to rtl
export const DocsContainer = styled.div`
  //padding: 20px;
  direction: ${direction};
  text-align: right;

  /* Fix Redoc's internal layout for RTL */
  .redoc-wrap {
    font-family: var(${cssVar.iransansFont}), system-ui, -apple-system, sans-serif;

    /* Override Redoc's internal layout for RTL compatibility */
    .menu-content {
      direction: ${direction};
      padding: 0 5px 0 0;

      label {
        padding: 12px 20px 12px 0;
      }

      ul {
        //padding-right: 6px;
        //padding-left: 6px;
      }
    }

    /* Fix API endpoint boxes */
    .operation-tag-content {
      padding-right: 0;
    }

    /* Fix method labels (GET, POST, etc.) */
    .operation {
      direction: ${direction};
    }

    /* Fix response section */
    .responses-inner {
      padding-right: 20px;
      padding-left: 0;
    }

    /* Fix schema section */
    .schema {
      direction: ${direction}; /* Keep schema in LTR for proper display */
      text-align: left;
    }

    /* Fix code samples */
    .tab-panel {
      direction: ${direction}; /* Keep code in LTR */
      text-align: left;
    }

    /* Fix response examples */
    .response-example {
      direction: ${direction}; /* Keep examples in LTR */
      text-align: left;
    }

    /* Fix scrollbars */
    pre {
      direction: ${direction};
      text-align: left;
    }
  }
`
