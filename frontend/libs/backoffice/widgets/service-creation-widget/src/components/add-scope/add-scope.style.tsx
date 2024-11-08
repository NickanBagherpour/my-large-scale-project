import { Form as AntForm, Radio as AntRadio } from 'antd';
import styled from 'styled-components';

export const Form = styled(AntForm)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
` as typeof AntForm;

export const Radios = styled(AntRadio.Group)`
  margin-bottom: 2.4rem;
`;

export const Radio = styled(AntRadio)`
  font-size: 1.2rem;
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
