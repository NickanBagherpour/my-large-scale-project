import styled from 'styled-components';
import { Layout } from 'antd';

import { cssVar } from '@oxygen/utils';
import { Direction } from '@oxygen/types';

export const MainLayout = styled(Layout)`
  max-width: ${cssVar.maxWidth};
  margin-inline: auto;
`;

export const MainContentLayout = styled(Layout)`
  margin-left: var(${cssVar.mainContentMargin});
  //margin-left: ${(p) => (p.theme.direction === Direction.RTL ? 0 : `var(${cssVar.mainContentMargin})`)};
  //margin-right: ${(p) => (p.theme.direction === Direction.LTR ? 0 : `var(${cssVar.mainContentMargin})`)};
  background-color: ${(p) => p.theme.background.main};
`;
