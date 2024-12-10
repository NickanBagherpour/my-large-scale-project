import styled from 'styled-components';
import RawFormItem from '../form-item/form-item';
import { Button } from '@oxygen/ui-kit';

export const FormItem = styled(RawFormItem)`
  flex: 1;
  & label {
    font-size: 1.2rem;
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
