import { Dropdown } from 'antd';
import styled from 'styled-components';

export const StyleDropDown = styled(Dropdown)`
  color: ${(p) => p.theme.primary._700};
  font-size: 1.4rem;
  font-weight: 600;
  align-items: start;
`;

export const Overlay = styled.div`
  & > ul.ant-dropdown-menu-root li {
    margin: 0.5rem 0;
  }

  & > ul.ant-dropdown-menu-root li[role='separator'] {
    margin: 0;
    background-color: ${(p) => p.theme.border._100};
  }
`;

export const StyleParagraph = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.6rem;

  & .avatar-icon {
    font-size: 2rem;
  }
`;

export const StyleSpan = styled.span`
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

export const StyleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const StyleDivider = styled.div`
  height: 0.1rem;
  min-width: 15rem;
  margin: 1rem 0.3rem 1rem 0.3rem;
  background: ${(p) => p.theme.border._100};
`;
export const StyleIcon = styled.i`
  height: 2.4rem;
  width: 2.4rem;
  font-size: 3rem;
  display: flex;
  justify-content: center;
  color: ${(p) => p.theme.text.primary};
`;
