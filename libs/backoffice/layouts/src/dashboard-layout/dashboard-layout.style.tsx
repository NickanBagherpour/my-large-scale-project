import styled from 'styled-components';
import { Layout } from 'antd';

import { cssVar } from '@oxygen/utils';
import { Direction } from '@oxygen/types';

export const MainContentLayout = styled(Layout)`
  margin-left: var(${cssVar.mainContentMargin});
  //margin-left: ${(p) => (p.theme.direction === Direction.RTL ? 0 : `var(${cssVar.mainContentMargin})`)};
  //margin-right: ${(p) => (p.theme.direction === Direction.LTR ? 0 : `var(${cssVar.mainContentMargin})`)};
  background-color: ${(p) => p.theme.background.main};
`;

export const MainLayout = styled(Layout)`
  isolation: isolate;

  .ant-layout{
    .ant-layout{
      @media print{
        margin-left: 0rem;
      }
    }
  }
  // background-color: ${(p) => p.theme.background.main};

`;
