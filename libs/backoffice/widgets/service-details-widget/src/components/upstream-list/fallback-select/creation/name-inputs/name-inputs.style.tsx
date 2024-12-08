import styled from 'styled-components';
import { Input as kitInput } from '@oxygen/ui-kit';

export const NameInputContainer = styled.div`
  margin-top: 2.4rem;
  & .ant-form {
    width: 100%;
  }
  & .ant-form-item {
    margin-bottom: 0;
  }
`;

export const NameInputLabel = styled.span`
  padding: 0.2rem 1.6rem 0 1.6rem;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
`;
export const Input = styled(kitInput)`
  width: 100%;
`;
export const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
`;
