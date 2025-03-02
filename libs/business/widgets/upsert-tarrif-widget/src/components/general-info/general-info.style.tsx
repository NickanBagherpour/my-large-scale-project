import { Form } from 'antd';
import styled from 'styled-components';

export const Icon = styled.i`
  font-size: 1.8rem;
  color: ${(p) => p.theme.primary.main};
`;

export const FormItem = styled(Form.Item)`
  & label {
    color: ${(p) => p.theme.text.primary};
    font-size: 1.2rem;
    padding-inline-start: 1.6rem;
    font-weight: normal !important;
    margin-bottom: 0.5rem;
  }
`;
