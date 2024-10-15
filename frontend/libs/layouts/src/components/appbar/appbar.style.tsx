import styled, { css } from 'styled-components';
import { Layout, Switch as AntSwitch, Dropdown as AntDropdown } from 'antd';
import { cssVar, respondTo } from '@oxygen/utils';

const { Header } = Layout;

export const AppBar = styled(Header)`
  display: flex;
  align-items: center;
  overflow: hidden;
  position: sticky; /*fixed*/
  height: var(${cssVar.appBarHeight});
  top: 0;
  left: 0;
  padding: 1.2rem 1.6rem;
  z-index: var(${cssVar.appbarZIndex});
  color: ${(p) => p.theme.onPrimary};
  background-color: ${(p) => p.theme.appbar};
  line-height: 1.5;

  span[role='img'] {
    font-size: 2.4rem;
  }

  ${respondTo.down('md')} {
    // display: inline-flex;
    // margin: 1rem;
    justify-content: space-between;
    padding: 2rem 2rem;
  }

  .appbar-title-oxygen-logo {
    display: flex;
    align-items: center;
    height: 1.8rem;
    padding: 1rem 1.6rem;
  }
  .appbar-title-bank-logo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1;
    width: 3.6rem;
    height: 3.6rem;
    object-fit: scale-down;
    padding: 0.4rem;
  }

  .menu-toggle-wrapper {
    display: none;
    font-size: 3rem;
    color: ${(p) => p.theme.onPrimary};
    &:hover {
      color: ${(p) => p.theme.onPrimary} !important;
    }

    ${respondTo.down('md')} {
      display: inline-flex;
      margin: 1rem;
    }
  }

  .appbar-item {
    margin-left: 1.6rem;
    color: ${(p) => p.theme.onPrimary};
    //width: 2.4rem;
    //height: 2.4rem;
    button {
      color: inherit !important;
      font-size: 2.4rem !important;
      line-height: 0;
    }
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 70%;
  margin: 0 1.6rem;
  background-color: ${(p) => p.theme.border};
`;
