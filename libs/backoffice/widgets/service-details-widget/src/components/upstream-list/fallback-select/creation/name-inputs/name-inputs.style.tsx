import styled from 'styled-components';
import { Input as kitInput } from '@oxygen/ui-kit';

export const NameInputContainer = styled.div`
  margin-top: 2.4rem;
  & .ant-form {
    width: 100%;
  }
`;
export const NameInputLabel = styled.span``;
export const Input = styled(kitInput)`
  width: 100%;
`;
export const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
`;
