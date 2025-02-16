import { BorderedSection } from '@oxygen/reusable-components';
import { Form as AntForm } from 'antd';
import styled from 'styled-components';

export const Form = styled(AntForm)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  margin-bottom: 4rem;
` as typeof AntForm;

export const FormItem = styled(Form.Item)`
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

export const Container = styled(BorderedSection)`
  display: flex;
  gap: 8rem;
  & > * {
    flex: 1;
  }
`;
