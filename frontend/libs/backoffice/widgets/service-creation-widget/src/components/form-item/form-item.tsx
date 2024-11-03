import { Form } from 'antd';
import styled from 'styled-components';

const FormItem = styled(Form.Item)`
  & label {
    padding-inline-start: 1rem;
  }
  margin-bottom: 0;
`;

export default FormItem;
