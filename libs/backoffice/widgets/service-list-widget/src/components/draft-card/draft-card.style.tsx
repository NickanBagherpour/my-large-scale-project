import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled(Link)`
  border: ${(p) => `1px solid ${p.theme.border._300}`};
  border-radius: 1.6rem;
  padding: 1.6rem;
  background: ${(p) => p.theme.primary._50};
  color: ${(p) => p.theme.text.primary};
  transition: all 200ms;

  &:hover {
    border-color: ${(p) => p.theme.primary._400};
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.6rem;
  align-items: center;
`;

export const Name = styled.h4`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 600;
`;

export const Trash = styled.i`
  font-size: 2.4rem;
  color: ${(p) => p.theme.text.primary};
`;

export const Footer = styled.footer`
  width: fit-content;
  margin-inline-start: auto;
  margin-top: 0.2rem;
  color: ${(p) => p.theme.text.quaternary};
  font-weight: 700;
`;
