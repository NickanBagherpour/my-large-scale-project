import { Tabs as KitTabs, Container as KitContainer } from '@oxygen/ui-kit';
import styled from 'styled-components';

export const Container = styled(KitContainer)`
  padding-bottom: 3rem;
`;

export const Tabs = styled(KitTabs)`
  margin-top: 2.4rem;

  & .ant-tabs-nav {
    margin-bottom: 3.2rem;
  }
`;
