import styled from 'styled-components';

import { Layout as AntLayout } from 'antd';

export const Layout = styled(AntLayout)`
  html:has(&) * {
    font-family: 'iransans';
  }
`;

export const Header = styled(AntLayout.Header)`
  // margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.appbar};
`;

export const MainContent = styled(AntLayout.Content)`
  margin: 1rem;
  // background-color: ${({ theme }) => theme.background._100};
  min-height: 100vh;
`;

export const ThemeSwitchWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.onPrimary};
`;
