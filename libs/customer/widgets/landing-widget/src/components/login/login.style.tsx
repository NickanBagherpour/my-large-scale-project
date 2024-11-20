import { Form } from 'antd';
import styled from 'styled-components';
import { Button, Input as KitInput } from '@oxygen/ui-kit';

export const Container = styled(Form)`
  border-radius: 1.5rem;
  background: ${(p) => p.theme.background.main};
  width: 48rem;
`;

export const Main = styled.div`
  background: ${(p) => p.theme.primary._50};
  border-radius: 1.5rem;
  padding: 2rem;
`;
export const Title = styled.h2`
  font-size: 1.6rem;
  margin: 0 0 2.8rem;
  padding-top: 13.6rem;
  text-align: center;
`;

export const Input = styled(KitInput)`
  height: 5.2rem;
  &,
  & input {
    font-weight: 700;
  }
`;

export const Visibility = styled.i`
  font-size: 2.4rem;
  color: ${(p) => p.theme.text.tertiary};
`;

export const Btn = styled(Button)`
  display: block;
  width: 100%;
`;
