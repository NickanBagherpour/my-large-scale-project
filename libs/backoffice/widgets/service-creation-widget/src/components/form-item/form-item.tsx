import { Form } from 'antd';
import styled from 'styled-components';

const FormItem = styled(Form.Item)`
  & label {
    padding-inline-start: 1rem;
    font-size: 1.2rem;
  }
  margin-bottom: 0;

  .ant-form-item-additional {
    margin-top: 0.3rem;
  }

  .ant-col {
    padding-bottom: 0.5rem;
  }
` as typeof Form.Item;

export default FormItem;
