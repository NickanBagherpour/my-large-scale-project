import { Button, Input as kitInput } from '@oxygen/ui-kit';
import { Form } from 'antd';
import styled from 'styled-components';
export const ModalContainer = styled.div``;
export const FormContainer = styled.div`
  & .ant-form-item-label {
    width: 30%;
    text-align: start;
  }
`;
export const FormItemContainer = styled(Form.Item)`
  justify-content: space-between;
`;
export const SubmitBtn = styled(Button)`
  width: 100%;
`;

export const Input = styled(kitInput)`
  width: 70%;
`;
