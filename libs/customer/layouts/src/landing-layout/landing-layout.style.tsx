import styled from 'styled-components';
import { Layout } from 'antd';

import { cssVar } from '@oxygen/utils';

export const MainContentLayout = styled(Layout)`
  max-width: ${cssVar.maxWidth};
  margin-inline: auto;
`;
