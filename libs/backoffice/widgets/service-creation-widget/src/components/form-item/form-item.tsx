import { Form } from 'antd';
import styled from 'styled-components';

const FormItem = styled(Form.Item)`
  & label {
    padding-inline-start: 1rem;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
  margin-bottom: 0;

  .ant-form-item-additional {
    margin-top: 0.3rem;
  }
` as typeof Form.Item;

export default FormItem;
