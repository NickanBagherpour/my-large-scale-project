import styled from 'styled-components';
import { Tabs as AntTabs } from 'antd';

export const StyledTabs = styled<any>(AntTabs)`
  .ant-tabs-tab {
    min-width: 240px;
    display: flex;
    justify-content: center;
    height: 48px;
    font-size: 1.4rem;
    margin: 0;

    &.ant-tabs-tab-active {
      background-color: ${(p) => p.theme.primary._50};
    }
  }

  .ant-tabs-nav {
    margin-bottom: 2.4rem;
    max-width: fit-content;
  }
`;
