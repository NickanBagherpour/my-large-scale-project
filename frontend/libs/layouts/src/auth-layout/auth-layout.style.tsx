import styled, { css } from 'styled-components';
import { getRelatedColor, respondTo } from '@oxygen/utils';
import { ThemeID } from '@oxygen/types';

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(p) => p.theme.surface};
  box-sizing: border-box;

  .auth-container {
    display: grid;
    grid-template-columns: 45% 55%;
    height: 100%;

    ${respondTo.down('lg')} {
      grid-template-columns: 50% 50%;
    }

    ${respondTo.down('md')} {
      grid-template-columns: 1fr;
    }
  }
`;

export const RightPanelContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .right-panel__main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0 20%;

    ${respondTo.down('md')} {
      padding: 0 15%;
    }

    ${respondTo.down('sm')} {
      padding: 0 10%;
    }
  }

  .right-panel__nav {
    width: 100%;
    display: none;
    padding: 2.4rem 2.4rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    ${respondTo.down('sm')} {
      display: flex;
      justify-content: flex-end;
      align-content: center;
      flex-wrap: wrap;
    }

    button,
    button:hover,
    button:focus,
    button:active {
      color: ${(p) => p.theme.textPrimary} !important;
    }
  }

  .right-panel__footer {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 24px;
    text-align: start;

    img {
      width: 18px;
      height: 18px;
      margin-right: 6px;
    }
  }
`;

export const LeftPanelContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  color: ${(p) => p.theme.onPrimary};

  background-color: ${(p) => getRelatedColor(p.theme.id, p.theme.primary, p.theme.background)} !important;

  .auth-bg-container {
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: calc(100% - 5px);
      object-fit: cover;
    }
  }

  .left-panel__bottom-pattern {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 0.5;
    mix-blend-mode: color-dodge;
    object-fit: contain;
    overflow: hidden;
  }

  ${respondTo.down('md')} {
    display: none;
  }

  .left-panel__nav {
    width: 100%;
    display: flex;
    padding: 1.4rem 10rem;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap-reverse;
    font-weight: 500;
    z-index: 10;

    > * {
      margin: 1rem 1.2rem;
    }

    > a {
      text-decoration: none;
      color: ${(p) => p.theme.onPrimary};
    }

    .left-panel__nav__bank-logo > img {
      flex-shrink: 0;
      width: min-content;
      height: 3.2rem;
      object-fit: scale-down;
    }
  }

  .left-panel__middle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    margin-top: -3.2rem;

    .left-panel__middle__team-name {
      font-size: 2.8rem;
      line-height: 0;
      font-weight: 500;
    }

    .left-panel__middle__motto {
      font-size: 4.8rem;
      font-weight: bold;
    }

    img {
      object-fit: scale-down;
      width: 70%;
      // height: 320px;
      // padding: 10%;
    }
  }

  .left-panel__footer {
    width: 100%;
    padding: 2.4rem;
    text-align: center;
    color: ${(p) => p.theme.onPrimary};

    /*! @noflip */
    direction: ltr;
  }
`;
