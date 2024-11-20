import styled from 'styled-components';
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

export const Header = styled.header<{ $isUpstream?: boolean }>`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;

  ${(p) =>
    p.$isUpstream &&
    `
  /*! @noflip */
  direction: ltr;
 // flex-direction: row-reverse;
  gap: 2rem;
  min-height: 5rem;
  max-height: 5rem;
  align-items: start;
  `}
`;

export const Title = styled(MarkText)<{ $isUpstream?: boolean }>`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${(p) => p.theme.text.primary};
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  ${(p) =>
    p.$isUpstream &&
    `
    text-wrap: wrap;
    line-height: 2.5rem;
    max-height: 5rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  `}
`;

export const Settings = styled.i<{ $isUpstream?: boolean }>`
  font-size: 2.4rem;
  color: ${(p) => p.theme.text.primary};
  margin-inline-start: ${(p) => (p.$isUpstream ? '0' : '1rem')};
`;

export const EName = styled.p`
  font-size: 1rem;
  color: ${(p) => p.theme.text.primary};
  margin: 0.5rem 0 0;
`;

export const Footer = styled.footer<{ $isUpstream?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${(p) => (p.$isUpstream ? '0.8rem' : '1.6rem')};

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
