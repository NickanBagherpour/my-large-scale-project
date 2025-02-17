import { Form } from 'antd';
import styled from 'styled-components';

export const FormItem = styled(Form.Item)`
  flex: 1;

  & label {
    padding-inline-start: 1rem;
    font-size: 1.2rem;
  }
  margin-bottom: 0;

  .ant-form-item-additional {
    margin-top: 0.3rem;
  }
` as typeof Form.Item;
