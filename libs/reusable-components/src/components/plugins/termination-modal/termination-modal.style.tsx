import { Button } from '@oxygen/ui-kit';
import { Form as AntForm } from 'antd';
import styled from 'styled-components';

export const RegisterBtn = styled(Button)`
  width: 100%;
  margin: 0 0 1.5rem !important;
`;

export const Form = styled(AntForm)`
  .ant-form-item-no-colon {
    height: 40px !important;
    text-align: start;
    width: 100%;
  }

  .first-item .ant-form-item-label {
    width: 8rem;
  }
` as typeof AntForm;

export const Row = styled.div`
  display: flex;
  gap: 3rem;
  justify-content: space-between;

  .ant-form-item:first-child {
    flex: 3;
  }

  .ant-form-item:last-child {
    flex: 1;
  }
`;
