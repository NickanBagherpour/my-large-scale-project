import styled from 'styled-components';
import { Tabs as AntTabs } from 'antd';

export const StyledTabs = styled(AntTabs)`
  .ant-tabs-tab {
    min-width: 240px;
    display: flex;
    justify-content: center;
    height: 48px;
    font-size: 1.4rem;
    margin: 0;

    @media print {
      display: none; /*conceal the element in print */
    }

    &.ant-tabs-tab-active {
      background-color: ${(p) => p.theme.primary._50};
    }
  }

  .ant-tabs-nav {
    margin-bottom: 2.4rem;
    max-width: fit-content;
  }

  body:has(&) .ant-tabs-dropdown-menu {
    background: ${(p) => p.theme.background.main};
    text-align: start;
  }
`;
