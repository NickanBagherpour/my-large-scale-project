import { Form } from 'antd';
import styled from 'styled-components';

export const FormItem = styled(Form.Item)`
  background: ${(p) => p.theme.background.main};

  align-items: center;

  padding: 2.1rem 3.8rem;
  border: ${(p) => `1px solid ${p.theme.border._100}`};
  border-radius: 1.6rem;

  label {
    color: ${(p) => p.theme.text.primary};
    font-weight: 600;
    line-height: 38px; /* Center label vertically regardless of input's error text */
  }

  .ant-input-number-group-wrapper {
    max-width: 55.2rem;
  }
`;
