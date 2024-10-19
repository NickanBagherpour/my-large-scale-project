import styled, { css } from 'styled-components';
import { type Status as StatusType } from './grid-card';
import Image from 'next/image';
import Link from 'next/link';

export const Container = styled(Link)`
  border-radius: 1.8rem;
  padding: 1.4rem 1.6rem 2.4rem;
  border: ${(p) => `1px solid ${p.theme.border._300}`};
  background: ${(p) => p.theme.background.main};
  position: relative;
  text-decoration: none;
  transition: all 200ms;
  overflow: hidden;

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

export const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${(p) => p.theme.text.primary};
  margin: 0;
`;

export const Settings = styled.i`
  font-size: 2.4rem;
  color: ${(p) => p.theme.text.primary};
`;

export const EName = styled.p`
  font-size: 1rem;
  color: ${(p) => p.theme.text.primary};
  margin: 0.5rem 0 0;
`;

export const Indicator = styled.div<{ status: StatusType }>`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  margin-inline-end: 0.4rem;
  box-sizing: content-box;
  ${(p) =>
    p.status === 'inactive'
      ? css`
          background: ${(p) => p.theme.error.main};
          border: ${(p) => `0.2rem solid ${p.theme.error._300}`};
        `
      : css`
          background: ${(p) => p.theme.secondary.main};
          border: ${(p) => `0.2rem solid ${p.theme.secondary._200}`};
        `};
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

export const Status = styled.p`
  margin-inline-end: auto;
  color: ${(p) => p.theme.text.tertiary};
`;

export const Date = styled.p`
  margin-inline-start: 0.6rem;
  color: ${(p) => p.theme.text.tertiary};
  font-size: 1.2rem;
`;

export const Looper = styled(Image)`
  position: absolute;
  right: 0;
  bottom: 0;
`;
