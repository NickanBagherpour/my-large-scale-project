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
  margin: 0 auto;
  .menu-header {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
  .menu-span {
    margin: 0 auto;
    color: ${(p) => p.theme.text.quaternary};
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.6rem;
  }
  .menu-p {
    color: ${(p) => p.theme.text.primary};
    margin: 0 auto;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.8rem;
  }
`;

export const styleDiv = styled('div')`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

export const styleDivider = styled.div`
  height: 1px;
  min-width: 15rem;
  margin: 1rem 0.3rem 2rem 0.3rem;
  background: ${(p) => p.theme.border._100};
`;
