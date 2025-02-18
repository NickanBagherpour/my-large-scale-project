import styled from 'styled-components';
import { Button, Input as UiKitInput } from '@oxygen/ui-kit';

export const PlainTextInput = styled(UiKitInput)`
  input {
    unicode-bidi: plaintext;
  }
` as typeof UiKitInput;

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.4rem;
`;

export const Title = styled.h3`
  color: ${(p) => p.theme.text.tertiary};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

export const Action = styled.div`
  display: flex;
  width: 100%;
  button,
  .ant-input-suffix {
    padding: 0;
  }
`;

export const Icon = styled.i`
  font-size: 1.8rem;
` as typeof Button;
