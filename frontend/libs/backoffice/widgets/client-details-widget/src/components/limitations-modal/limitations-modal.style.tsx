import { Button, Input } from '@oxygen/ui-kit';
import styled from 'styled-components';

export const RegisterBtn = styled(Button)`
  width: 100%;
  margin-bottom: 1.5rem;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem 2rem;
`;

export const Rate = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

export const RateInput = styled(Input)`
  height: 100%;
`;

export const RateTxt = styled.p`
  margin: 0;
  white-space: nowrap;
  color: ${(p) => p.theme.text.quaternary};
  font-size: 1.4rem;
`;
