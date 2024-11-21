import styled from 'styled-components';
import { Input as KitInput, Divider as KitDivider, Button as KitButton } from '@oxygen/ui-kit';

export const FormContainer = styled.div``;

export const FormBox = styled.div`
  min-height: 20rem;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const FormTitle = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.5rem;
  margin-bottom: 3.2rem;
`;

export const FormInputs = styled.div`
  background-color: ${(p) => p.theme.background._100};
  width: 100%;
  padding: 2.1rem 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  border-radius: 1.2rem;
  border: 1px solid ${(p) => p.theme.divider};
  margin-bottom: 1.6rem;

  & .ant-form-item:last-child {
    margin-bottom: 0;
  }
`;

export const Input = styled(KitInput)`
  max-width: 50.4rem;
  margin-inline-end: auto;
`;

export const Button = styled(KitButton)`
  &&& {
    font-size: 1.6rem;
    width: 100%;
    margin-top: 1.6;
  }
`;

export const Divider = styled(KitDivider)`
  border-top-width: 0.2rem;
`;

export const Span = styled.span`
  a {
    color: ${(p) => p.theme.primary.main};
  }
`;
