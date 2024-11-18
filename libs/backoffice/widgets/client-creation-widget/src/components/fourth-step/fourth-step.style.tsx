import { Input } from '@oxygen/ui-kit';
import styled from 'styled-components';

export const FourthStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
export const Header = styled.p`
  color: ${(p) => p.theme.text.primary};
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2.5rem;
  padding: 1rem;
  margin: 1.4rem 0;
`;
export const Para = styled.p`
  padding-inline-start: 1.6rem;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
  margin: 0 0 0.4rem 0;
`;
export const StyleInput = styled(Input)`
  max-width: 26.7rem;
`;

export const Footer = styled.div`
  display: flex;
  height: 7.2rem;
  align-items: center;
  justify-content: end;
  border-top: 1px solid ${(p) => p.theme.border._100};
  gap: 1.2rem;
`;
