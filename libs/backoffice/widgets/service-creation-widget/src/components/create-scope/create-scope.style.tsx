import styled from 'styled-components';
import RawFormItem from '../form-item/form-item';
import { Button } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';

export const FormItem = styled(RawFormItem)`
  flex: 1;
  & label {
    height: 100% !important;
    width: 100%;
  }

  & .ant-col:has(label) {
    flex: 1;
    min-width: 10rem;
  }

  & .ant-col:not(:has(label)) {
    flex: 9;
  }

  ${respondTo.down('md')} {
    & .ant-row {
      flex-direction: column;
    }
  }
`;

export const Create = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  margin-bottom: 2.8rem;
`;

export const AddBtn = styled(Button)`
  display: block;
  margin-inline-start: auto;
`;

export const Txt = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${(p) => p.theme.text.primary};
`;
