import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';
import RawFormItem from '../form-item/form-item';
import { Drawer as AntDrawer } from 'antd';

export const Sso = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1.6rem;
  ${respondTo.down('sm')} {
    flex-direction: column;

    & > * {
      width: 100%;
    }
  }
`;

export const FormItem = styled(RawFormItem)`
  flex: 1;
  & label {
    font-size: 1.2rem;
  }
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

  & .ant-drawer-header-title {
    flex-direction: row-reverse;
  }

  & .ant-drawer-title {
    font-weight: 700;
  }

  & .ant-drawer-body {
    padding-top: 0;
    display: flex;
  }

  ${respondTo.down('md')} {
    border-radius: 0;
  }
`;

export const CloseIcon = styled.i`
  font-size: 2.4rem;
`;
