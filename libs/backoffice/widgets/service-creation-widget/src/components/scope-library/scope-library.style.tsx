import { Table as KitTable, Button as KitButton, Divider as KitDivider } from '@oxygen/ui-kit';
import { Form as AntForm, Radio as AntRadio } from 'antd';
import styled from 'styled-components';

export const Form = styled(AntForm)`
  display: flex;
  flex-direction: column;
  flex: 1;
` as typeof Form;

export const Button = styled(KitButton)`
  display: block;
  margin-inline-start: auto;
`;

export const Table = styled(KitTable)`
  padding-top: 4.3rem;
  margin-bottom: auto;
  padding-bottom: 0;
`;

export const Radio = styled(AntRadio)`
  margin: 0;

  & :not(.ant-radio-checked) .ant-radio-inner {
    border: ${(p) => `2px solid ${p.theme.text.tertiary}`};
  }

  & .ant-radio-inner {
    height: 2rem;
    width: 2rem;
  }
`;

export const FormItem = styled(Form.Item)`
  margin-bottom: 0;
  & label {
    padding-inline-start: 1rem;
  }
`;
