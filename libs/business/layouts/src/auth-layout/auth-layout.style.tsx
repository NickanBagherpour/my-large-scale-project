import { cssVar } from '@oxygen/utils';
import { Layout } from 'antd';
import styled from 'styled-components';

export const MainContentLayout = styled(Layout)`
  max-width: ${cssVar.maxWidth};
  margin-inline: auto;
`;
