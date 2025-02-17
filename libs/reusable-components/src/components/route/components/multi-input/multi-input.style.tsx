import styled from 'styled-components';
import { Button, Input as UiKitInput } from '@oxygen/ui-kit';

export const PlainTextInput = styled(UiKitInput)`
  unicode-bidi: plaintext;
  margin-inline-end: 1rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`;

export const Action = styled.div`
  display: flex;
  width: 100%;
  button {
    /* to align buttons and the input even when there is a validation error */
    height: 40px;
  }
`;

export const Icon = styled.i`
  font-size: 2.4rem;
` as typeof Button;
