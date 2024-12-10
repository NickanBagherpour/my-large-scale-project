import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';
import { Drawer as AntDrawer } from 'antd';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const PlusIcon = styled.i`
  font-size: 1.8rem;
`;

export const Drawer = styled(AntDrawer)`
  .ant-drawer-content-wrapper:has(&) {
    border-start-start-radius: 2.4rem;
    border-end-start-radius: 2.4rem;
    overflow: hidden;
  }

  & .ant-drawer-header {
    border-bottom: ${(p) => `1px solid ${p.theme.border._100}`};
  }

  & .ant-drawer-header-title {
    flex-direction: row-reverse;
  }

  & .ant-drawer-title {
    font-weight: 700;
  }

  & .ant-drawer-body {
    padding-top: 1.2rem;
    display: flex;
    flex-direction: column;
  }

  ${respondTo.down('md')} {
    .ant-drawer-content-wrapper:has(&) {
      border-radius: 0;
      overflow: auto;
    }
  }
`;

export const CloseIcon = styled.i`
  font-size: 2.4rem;
`;
