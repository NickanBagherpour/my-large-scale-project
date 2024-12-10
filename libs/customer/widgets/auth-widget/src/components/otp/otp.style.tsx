import styled from 'styled-components';
import { Button as KitButton, Divider as KitDivider, Input as KitInput } from '@oxygen/ui-kit';

export const FormContainer = styled.div`
  /* background-color: ${(p) => p.theme.background._50}; */
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormTitle = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.5rem;
`;
export const Box = styled.div`
  width: 100%;
`;
export const BackParagraph = styled.span`
  color: ${(p) => p.theme.primary.main};
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2rem;
`;
export const Paragraph = styled.p`
  margin-top: 3.2rem;
  display: flex;
  text-align: right;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2rem;
`;

export const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;

  .ant-form-item {
    margin: 0;
  }

  .ant-otp {
    width: 100%;
    flex-direction: row-reverse;
    margin: 2.4rem 0;
    justify-content: space-between;
  }

  .ant-input {
    height: 5.2rem;
    width: 5.2rem;
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
    margin-top: 1.2rem;
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

export const TimerBox = styled.div`
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
