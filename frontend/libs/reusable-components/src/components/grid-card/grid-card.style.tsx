import styled, { css } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { MarkText } from '@oxygen/ui-kit';

export const Container = styled(Link)`
  border-radius: 1.8rem;
  padding: 1.4rem 1.6rem 2.4rem;
  border: ${(p) => `1px solid ${p.theme.border._300}`};
  background: ${(p) => p.theme.background.main};
  position: relative;
  text-decoration: none;
  transition: all 200ms;
  overflow: hidden;
  display: block;
  isolation: isolate;

  &:hover {
    border-color: ${(p) => p.theme.primary._400};
  }
`;

export const Header = styled.header<{ flip?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${(p) => (p.flip ? 'row-reverse' : 'row')};
`;

export const Title = styled(MarkText)`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${(p) => p.theme.text.primary};
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Settings = styled.i`
  font-size: 2.4rem;
  color: ${(p) => p.theme.text.primary};
  margin-inline-start: 1rem;
`;

export const EName = styled.p`
  font-size: 1rem;
  color: ${(p) => p.theme.text.primary};
  margin: 0.5rem 0 0;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.6rem;

  & p {
    margin-block: 0;
  }
`;

export const StatusTxt = styled.p`
  margin-inline-end: auto;
  margin-inline-start: 0.4rem;
  color: ${(p) => p.theme.text.tertiary};
`;

export const Date = styled.p`
  margin-inline-start: 0.6rem;
  color: ${(p) => p.theme.text.tertiary};
  font-size: 1.2rem;
`;

export const Looper = styled(Image)`
  position: absolute;
  bottom: 0;
  z-index: -1;
  right: ${(p) => (p.theme.direction === 'rtl' ? '0' : 'auto')};
  left: ${(p) => (p.theme.direction === 'rtl' ? 'auto' : '0')};
`;
