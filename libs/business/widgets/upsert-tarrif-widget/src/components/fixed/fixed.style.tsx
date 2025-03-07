import { Form } from 'antd';
import styled from 'styled-components';

export const FormItem = styled(Form.Item)`
  background: ${(p) => p.theme.background.main};
  padding: 2.1rem 3.8rem;
  border: ${(p) => `1px solid ${p.theme.border._100}`};
  border-radius: 1.6rem;
  label {
    color: ${(p) => p.theme.text.primary};
    font-weight: 600;
  }
`;
