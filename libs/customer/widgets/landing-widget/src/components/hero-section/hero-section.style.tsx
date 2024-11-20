import styled from 'styled-components';
import bg from 'apps/customer-portal/public/assets/images/bg.svg';
import { Button } from '@oxygen/ui-kit';
import Link from 'next/link';

export const Hero = styled.header`
  min-height: 120vh; /* FIXME */
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Nav = styled.nav`
  padding: 1rem 5.2rem;
  display: flex;
  align-items: center;
  margin-bottom: 4.4rem;
`;

export const AppName = styled.p`
  margin-block: 0;
  margin-inline-end: auto;
  color: ${(p) => p.theme.onPrimary};
`;

export const BankLink = styled(Link)`
  margin-inline-end: 1rem;
`;

export const LoginLink = styled(Link)`
  color: ${(p) => p.theme.text.primary};
  background: ${(p) => p.theme.background.main};
  text-decoration: none;
  padding-inline-start: 0.8rem;
  padding-inline-end: 1.6rem;
  padding-block: 1rem;
  border-radius: 0.8rem;
  margin-inline-end: 3.2rem;
`;

export const Title = styled.h1`
  font-size: 4.8rem;
  font-weight: 500;
  color: ${(p) => p.theme.onPrimary};
  margin: 0 0 1.6rem;
  & span {
    font-weight: 300;
    font-size: 3.6rem;
  }
`;

export const Slogon = styled.p`
  color: ${(p) => p.theme.onPrimary};
  font-size: 1.8rem;
  margin: 0 0 2rem;
  font-weight: 300;
  line-height: 1.5;
`;

export const Info = styled.div`
  width: max-width;
`;

export const Intro = styled.section`
  display: flex;
  align-items: center;
  padding-inline: 12.3rem;
`;

export const Btns = styled.div`
  display: flex;
  gap: 2rem;
`;

export const LoginBtn = styled(Button)`
  display: flex;
  align-items: center;
  gap: 1rem;
  && {
    color: ${(p) => p.theme.text.primary};
    background: ${(p) => p.theme.background.main};
    height: 5.8rem;
    padding-inline-start: 1.6rem;
    padding-inline-end: 2.4rem;
  }
`;

export const ManualBtn = styled(Button)`
  border: ${(p) => p.theme.border.main};
  height: 5.8rem;
  padding-inline-start: 1.6rem;
  padding-inline-end: 2.4rem;
`;

export const ClockIcon = styled.i`
  font-size: 1.8rem;
`;
