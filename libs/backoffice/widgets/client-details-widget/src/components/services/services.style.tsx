import styled from 'styled-components';
import { Button as KitButton } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';
import { Form } from 'antd';

export const FormItem = styled(Form.Item)`
  & .ant-row {
    gap: 4rem;
    align-items: center;
    ${respondTo.down('md')} {
      flex-direction: column;
      align-items: flex-start;
      gap: 0;
      & > div {
        text-align: start;
        padding: 0;
        width: 100%;
      }
    }
  }

  & label {
    font-size: 1.6rem;
    font-weight: 600;
    color: ${(p) => p.theme.text.primary};
    margin: 0;
    white-space: nowrap;
  }
`;

export const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${(p) => p.theme.text.primary};
  margin: 0;
  white-space: nowrap;
`;

export const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  justify-content: center;
`;

export const StatusTxt = styled.p`
  margin: 0;
`;

export const TrashIcon = styled.i`
  font-size: 2.4rem;
`;

export const DetailsBtn = styled(KitButton)`
  font-weight: 600;
`;
