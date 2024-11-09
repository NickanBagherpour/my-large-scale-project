import { Table as KitTable, Button as KitButton, Divider as KitDivider } from '@oxygen/ui-kit';
import { Form as AntForm, Radio as AntRadio } from 'antd';
import styled from 'styled-components';

export const Form = styled(AntForm)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 4rem;
  flex: 1;
`;

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

  && td.ant-table-cell {
    padding: 0.7rem;
  }

  && .even-row {
    background-color: ${(p) => p.theme.primary._50};
  }
`;

export const Radio = styled(AntRadio)`
  & :not(.ant-radio-checked) .ant-radio-inner {
    border: ${(p) => `2px solid ${p.theme.text.tertiary}`};
  }

  & .ant-radio-inner {
    height: 2rem;
    width: 2rem;
  }
`;

export const TableCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 1rem;
`;

export const TableRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  font-size: 1.5rem;
  color: ${(p) => p.theme.text.secondary};

  & > * {
    white-space: nowrap;
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
