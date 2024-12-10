import { Button } from '@oxygen/ui-kit';
import { Form } from 'antd';
import styled from 'styled-components';

export const RegisterBtn = styled(Button)`
  width: 100%;
  margin: 0 0 1.5rem !important;
`;

export const FormItem = styled(Form.Item)`
  .ant-row {
    align-items: center;
  }

  & .ant-col:has(label) {
    flex: 3;

    & label {
      width: 100%;
      color: ${(p) => p.theme.text.quaternary};
    }
  }

  & .ant-col {
    flex: 7;
  }
`;
