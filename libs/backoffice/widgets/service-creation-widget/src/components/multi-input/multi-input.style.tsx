import styled from 'styled-components';
import { Input as UiKitInput } from '@oxygen/ui-kit';

export const PlainTextInput = styled(UiKitInput)`
  unicode-bidi: plaintext;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const Action = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const PlusBtn = styled.button`
  font-size: 2.4rem;
  background: transparent;
  border: none;
  color: ${(p) => p.theme.secondary.main};

  &:disabled {
    color: ${(p) => p.theme.iconPrimary};
  }
`;

export const TrashBtn = styled.button`
  font-size: 2.4rem;
  background: transparent;
  border: none;
  color: ${(p) => p.theme.error.main};

  &:disabled {
    color: ${(p) => p.theme.iconPrimary};
  }
`;
