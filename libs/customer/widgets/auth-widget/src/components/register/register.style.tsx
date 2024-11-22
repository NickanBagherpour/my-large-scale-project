import styled from 'styled-components';
import { Input as KitInput, Divider as KitDivider, Button as KitButton } from '@oxygen/ui-kit';

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

  & .ant-input-suffix{
    margin-left: 0;
    margin-right: 0;
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
    margin-top: 1.6rem;
  }
`;

export const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  color: inherit; /* Inherit color from parent */
  //cursor: pointer;

  svg {
    width: 2.4rem; /* Adjust size as needed */
    height: 2.4rem; /* Adjust size as needed */
    fill: none; /* Ensure no fill if only using stroke */
    stroke: currentColor; /* Ensure stroke uses currentColor */
  }

  //&:hover {
  //  color: #40a9ff; /* Optional: Change color on hover */
  //}
`;



export const Divider = styled(KitDivider)`
  border-top-width: 0.2rem;
`;

export const Span = styled.span`
  a {
    color: ${(p) => p.theme.primary.main};
  }
`;
