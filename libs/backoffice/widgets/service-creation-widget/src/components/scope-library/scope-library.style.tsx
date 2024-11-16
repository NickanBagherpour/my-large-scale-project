import { Table as KitTable, Button as KitButton, Divider as KitDivider } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';
import { Form as AntForm, Radio as AntRadio } from 'antd';
import styled from 'styled-components';

export const Form = styled(AntForm)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 4rem;
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

  && th.ant-table-cell {
    padding: 2.4rem !important;
  }

  ${respondTo.up('md')} {
    && td.ant-table-cell {
      padding: 0.7rem;
    }
  }

  && .even-row {
    background-color: ${(p) => p.theme.primary._50};
  }
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
  & .ant-form-item-label {
    padding-bottom: 0rem;
  }
  & label {
    font-size: 1.2rem;
    padding-inline-start: 1rem;
  }
`;

export const Divider = styled(KitDivider)`
  margin: 0 0 1.2rem;
`;
