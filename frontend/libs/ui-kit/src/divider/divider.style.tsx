import styled from 'styled-components';
import { Divider as AntDivider } from 'antd';

export const StyledDivider = styled(AntDivider)`
  border-color: ${(p) => p.theme.border._100};
`;
