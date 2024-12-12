import { Form } from 'antd';
import styled from 'styled-components';

const FormItem = styled(Form.Item)`
  & label {
    padding-inline-start: 1rem;
    margin-bottom: 0.5rem;
  }
  margin-bottom: 0;
` as typeof Form.Item;

export default FormItem;
