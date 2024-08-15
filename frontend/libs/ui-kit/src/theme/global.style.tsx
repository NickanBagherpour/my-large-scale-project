import { css, Global } from '@emotion/react';

import { useAppTheme } from '@oxygen-portal/hooks';
import { Direction } from '@oxygen-portal/types';
import { cssVar, respondTo } from '@oxygen-portal/utils';

const GlobalStyle = () => {
  const theme = useAppTheme();

  const radius = (theme as any).shape.borderRadius || 8;

  return (
    <Global
      styles={css`
        :root {
          ${cssVar.drawerWidth}: 27rem;
          ${cssVar.appbarHeight}: 8rem;
          ${cssVar.mainContentMargin}: var(${cssVar.drawerWidth});
          ${cssVar.drawerSideGap}: 10rem;
          ${cssVar.verticalGap}: 2.8rem;
          ${cssVar.radius}: ${radius * 0.1}rem;
        }

        ${respondTo.down('md')} {
          :root {
            ${cssVar.mainContentMargin}: 0;
          }
        }

        ${respondTo.down('xl')} {
          :root {
            ${cssVar.drawerSideGap}: 3.2rem;
          }
        }

        ${respondTo.down('lg')} {
          :root {
            ${cssVar.drawerWidth}: 26rem;
            ${cssVar.drawerSideGap}: 2.4rem;
          }
        }

        @media only screen and (min-width: 150em) {
          :root {
            ${cssVar.drawerSideGap}: 10vw;
          }
        }

        *,
        *::before,
        *::after {
          box-sizing: inherit;
        }

        *::-webkit-scrollbar {
          width: 1.2rem;
          height: 1.2rem;
        }

        *::-webkit-scrollbar-track {
          background: ${theme.base.background};
        }

        *::-webkit-scrollbar-thumb {
          background: #ddd;
          box-shadow: inset 0 0 0 0.4rem ${theme.base.background};
        }

        * {
          scrollbar-width: thin;
        }

        html {
          font-size: 62.5%; // font-size = 10px; 1rem = 10px, 10px/16px = 62.5% or 10px is 0.625em
          box-sizing: border-box;

          font-family: ${theme.base.direction === Direction.RTL ? 'var(--font-iransans)' : 'Tahoma'}, sans-serif;

          ${respondTo.down('md')} {
            font-size: 50%; //  font-size = 8px; 50% of 1em [1em = 16px]
          }
        }

        body {
          padding: 0 !important;
          margin: 0;
          overflow: auto !important;
          font-size: 1.4rem;
          background-color: ${theme.base.background};
          color: ${theme.base.textPrimary};

          /* @noflip */
          direction: ${theme.base.direction === Direction.RTL ? Direction.LTR : Direction.LTR}; //fix this later
        }

        #__next {
          isolation: isolate;
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: ${theme.base.textPrimary} !important;
          //background-color: #d92525 !important;
          //transition: background-color 5000s ease-in-out 0s;
          -webkit-box-shadow: 0 0 0 50px ${theme.base.surface} inset !important; /* Change the color to your own background color */
        }
      `}
    />
  );
};

export default GlobalStyle;
