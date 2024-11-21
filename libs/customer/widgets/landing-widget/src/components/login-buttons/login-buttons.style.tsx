import { Button } from '@oxygen/ui-kit';
import styled from 'styled-components';

export const Btns = styled.div`
  display: flex;
  gap: 2rem;
  width: fit-content;
`;

export const LoginBtn = styled(Button)`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  && {
    color: ${(p) => p.theme.text.primary};
    background: ${(p) => p.theme.background.main};
    height: 5.8rem;
    padding-inline-start: 1.6rem;
    padding-inline-end: 2.4rem;
  }
`;

export const ManualBtn = styled(Button)`
  && {
    border: ${(p) => `1px solid ${p.theme.onPrimary}`};
    height: 5.8rem;
    padding-inline-start: 1.6rem;
    padding-inline-end: 2.4rem;
    background: transparent;
  }
`;

export const ClockIcon = styled.i`
  font-size: 1.8rem;
`;
