import { createGlobalStyle } from 'styled-components';

import { breakpoints, cssVar, respondTo } from '@oxygen/utils';
import { Direction } from '@oxygen/types';

const GlobalStyle = createGlobalStyle<any>`
  :root {
    ${cssVar.appBarHeight}: 7.7rem;
    ${cssVar.drawerWidth}: 23rem;
    ${cssVar.mainContentMargin}: var(${cssVar.drawerWidth});
    ${cssVar.drawerSideGap}: 0;//1rem;
    ${cssVar.verticalGap}: 0px;//2.8rem;
    ${cssVar.radius}: 0.6rem;
    ${cssVar.appbarZIndex}: 10000;
    ${cssVar.onAppbarZIndex}: 10001;
  }

  ${respondTo.down('md')} {
    :root {
      ${cssVar.appbarZIndex}: 1000;
    }
  }

  ${respondTo.down('md')} {
    :root {
      ${cssVar.appBarHeight}: 7rem;
      ${cssVar.mainContentMargin}: 0;

    }
  }

  ${respondTo.down('xl')} {
    :root {
      ${cssVar.drawerSideGap}: 0;
    }
  }

  ${respondTo.down('lg')} {
    :root {
      ${cssVar.drawerSideGap}: 0;//2.4rem;
    }
  }


  @media only screen and (min-width: 150em) {
    :root {
      ${cssVar.drawerSideGap}: 0;//10vw;
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  *::-webkit-scrollbar {
    width: 6px;
    height: 1.2rem;
  }

  *::-webkit-scrollbar-track {
    background: ${(props) => props.theme.background.main};
  }

  *::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.border.main};
      //box-shadow: inset 0 0 0 0.4rem ${(props) => props.theme.background.main};
  }

  * {
    scrollbar-width: thin;
  }

  html {
    font-size: 62.5%; // font-size = 10px; 1rem = 10px, 10px/16px = 62.5% or 10px is 0.625em
    box-sizing: border-box;

    ${respondTo.down('md')} {
      font-size: 50%; //  font-size = 8px; 50% of 1em [1em = 16px]
    }
  }

  body {
    padding: 0;
    margin: 0;
    font-family: ${(props) =>
      props.theme.direction === Direction.RTL ? 'var(--font-iransans)' : 'Tahoma'}, sans-serif;
    font-size: 1.4rem;
    background-color: ${(props) => props.theme.background.main};
    color: ${(props) => props.theme.text.primary};
    /*! @noflip */
    direction: ${(props) => (props.theme.direction === Direction.RTL ? Direction.RTL : Direction.LTR)};
  }

  html body {
    /* modal issue */
    //overflow-y: auto !important;
    width: 100% !important;
  }

  .ant-picker-input > input, .ant-picker-header * {
    font-family: inherit;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-text-fill-color: ${(props) => props.theme.text.primary} !important;
    //background-color: #d92525 !important;
    //transition: background-color 5000s ease-in-out 0s;
    -webkit-box-shadow: 0 0 0 50px ${(props) =>
      props.theme.surface} inset !important; /* Change the color to your own background color */

  }

  .ant-modal-confirm-content {
    display: flex;
    width: 100%;
  }

  .anticon {
    color: ${(props) => props.theme.iconPrimary};
  }

  .ant-form-large .ant-form-item .ant-form-item-label > label {
    height: auto;
    font-weight: 500;
  }

  .ant-form-item-explain {
    font-size: 1.2rem !important;
    //margin-bottom: 1rem;
  }

  .ri-2x {
    font-size: 2rem;
  }

  .ant-notification {
    font-family: inherit;

    & .ant-notification-notice-wrapper {
      background: ${(props) => props.theme.surface};
      border-radius: 10px;

      & .ant-notification-notice {
        color: ${(props) => props.theme.text.primary};
        padding: 2rem 1.6rem;
        font-family: inherit;

        & .ant-notification-notice-content {
          margin-right: 2rem;
        }

        & .ant-notification-notice-message, & .ant-notification-notice-description {
          color: inherit;
        }

        & .ant-notification-notice-close {
          inset-inline-end: 1.6rem;
        }
      }
    }
  }
`;
export default GlobalStyle;
