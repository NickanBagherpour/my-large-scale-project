import { Form as AntForm, Radio as AntRadio, Drawer as AntDrawer } from 'antd';
import styled from 'styled-components';
import RawFormItem from '../form-item/form-item';
import { respondTo } from '@oxygen/utils';

export const Form = styled(AntForm)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

export const Radios = styled(AntRadio.Group)`
  margin-bottom: 2.4rem;
`;

export const Radio = styled(AntRadio)`
  font-size: 1.2rem;
`;

export const PlusIcon = styled.i`
  font-size: 1.8rem;
`;

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

export const Create = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const Drawer = styled(AntDrawer)`
  border-start-start-radius: 2.4rem;
  border-end-start-radius: 2.4rem;

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
