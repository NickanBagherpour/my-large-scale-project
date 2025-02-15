import styled from 'styled-components';
import { Button, Input as UiKitInput } from '@oxygen/ui-kit';

export const PlainTextInput = styled(UiKitInput)`
  unicode-bidi: plaintext;
  margin-inline-end: 3rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const Action = styled.div`
  display: flex;
  align-items: center;
`;

export const Icon = styled.i`
  font-size: 2.4rem;
` as typeof Button;
