import { respondTo } from '@oxygen/utils';
import { Form } from 'antd';
import styled from 'styled-components';

export const FormItem = styled(Form.Item)`
  flex-basis: 100%;
`;
export const Container = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  gap: 1rem;
  ${respondTo.down('md')} {
    flex-direction: column;
  }
`;
