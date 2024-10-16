import { Dropdown } from 'antd';
import styled from 'styled-components';

export const StyleDropDown = styled(Dropdown)`
  color: ${(p) => p.theme.primary._700};
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2rem;
  align-items: start;
`;
export const StyleParagraph = styled('p')`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;
export const StyleSpan = styled('span')`
  cursor: pointer;
  margin: 0 auto;
`;
