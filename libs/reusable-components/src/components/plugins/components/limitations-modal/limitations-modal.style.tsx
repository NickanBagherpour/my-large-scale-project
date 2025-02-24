import { Button, Input } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';
import { Form as AntForm } from 'antd';
import styled from 'styled-components';

export const RegisterBtn = styled(Button)`
  width: 100%;
  margin: 0 0 1.5rem !important;
`;

export const Form = styled(AntForm)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem 2rem;

  & .ant-form-item {
    margin: 0;
  }

  ${respondTo.down('sm')} {
    grid-template-columns: repeat(1, 1fr);

    & .ant-col {
      flex: unset;
    }

    & .ant-row {
      width: auto;
    }
  }
` as typeof AntForm;

export const Rate = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

export const RateInput = styled(Input)`
  height: 100%;
`;

export const RateLimit = styled(Form.Item)`
  .ant-row {
    display: flex;
    align-items: baseline;
    gap: 1.5rem;
  }
` as typeof AntForm.Item;

export const Div = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  & label,
  & span {
    font-size: 1.4rem;
    color: ${(p) => p.theme.text.quaternary};
  }

  ${respondTo.down('sm')} {
    & > div {
      flex: 1;
    }
    & .ant-col:has(input) {
      flex: 1;
    }
  }
`;
