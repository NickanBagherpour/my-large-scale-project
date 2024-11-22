import styled from 'styled-components';
import { Input as KitInput, Divider as KitDivider, Button as KitButton } from '@oxygen/ui-kit';

export const FormContainer = styled.div`
  /* background-color: ${(p) => p.theme.background._50}; */
  /* height: 100%; */
  display: flex;
  flex-direction: column;

  justify-content: center;
`;

export const FormTitle = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.5rem;
`;
export const Paragraph = styled.p`
  display: flex;
  text-align: right;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2rem;
`;

export const FormInputs = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4.2rem;
  gap: 1.8rem;
  .ant-form-item {
    margin: 0;
  }
`;

export const FormInput = styled.div`
  display: flex;
  flex-direction: column;
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

export const OTP = styled(KitInput.OTP)`
  & .ant-otp-rtl {
    direction: ltr;
  }
`;
