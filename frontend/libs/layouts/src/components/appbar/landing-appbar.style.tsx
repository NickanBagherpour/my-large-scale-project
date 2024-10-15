import styled from 'styled-components';
import { Layout } from 'antd';
import { cssVar, respondTo } from '@oxygen/utils';

const { Header } = Layout;

export const AppBar = styled(Header)<any>`
  display: flex;
  align-items: center;
  overflow: hidden;
  position: sticky; /*fixed*/
  height: var(${cssVar.appBarHeight});
  top: 0;
  left: 0;
  padding: 2rem 10rem;
  z-index: var(${cssVar.appbarZIndex});
  color: ${(p) => (p.primary.main ? p.theme.onPrimary : p.theme.text.secondary)};
  background-color: ${(p) => (p.primary.main ? p.theme.appbar : p.theme.surface)};
  line-height: 1.5;

  ${respondTo.down('md')} {
    // display: inline-flex;
    // margin: 1rem;
    justify-content: space-between;
    padding: 2rem 2rem;
  }

  .appbar-bank-logo {
    width: 15rem;
    height: 3.2rem;
    object-fit: scale-down;
  }

  .logout-item {
    button {
      color: inherit !important;
      font-size: 2.4rem;
      line-height: 0;
    }
  }

  .landing-nav {
    //width: 100%;
    //display: flex;
    //padding: 1.4rem 10rem;
    //align-items: center;
    //justify-content: center;
    //flex-wrap: wrap-reverse;
    margin: 0 2rem;
    font-weight: 500;
    color: ${(p) => (p.primary.main ? p.theme.onPrimary : p.theme.text.secondary)};

    //> * {
    //  margin: 1rem 1.2rem;
    //}

    a {
      text-decoration: none;
      // color: ${(p) => p.theme.onPrimary};
      color: ${(p) => (p.primary.main ? p.theme.onPrimary : p.theme.text.secondary)};
    }
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 100%;
  margin-left: 1.6rem;
  background-color: ${(p) => p.theme.onPrimary};
`;
