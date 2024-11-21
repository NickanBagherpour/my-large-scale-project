import styled from 'styled-components';
import bg from 'apps/customer-portal/public/assets/images/bg.svg';
import Link from 'next/link';
import { respondTo } from '@oxygen/utils';

export const Hero = styled.header`
  min-height: 120vh; /* FIXME */
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 5.5rem;
`;

export const Nav = styled.nav`
  padding: 1rem 5.2rem;
  display: flex;
  align-items: center;
  margin-bottom: 4.4rem;
`;

export const AppName = styled.p`
  margin-block: 0;
  color: ${(p) => p.theme.onPrimary};
  ${respondTo.down('md')} {
    display: none;
  }
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
  margin-inline-start: auto;
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
  flex: 5;
`;

export const Intro = styled.section`
  display: flex;
  align-items: center;

  ${respondTo.down('lg')} {
    flex-direction: column;
    gap: 3rem;
  }
`;

export const ImgContainer = styled.div`
  position: relative;
  flex: 7.24;
  max-width: 72.4rem;
  /* height: 70.6rem; */
  aspect-ratio: 1.0264;

  ${respondTo.down('lg')} {
    width: 100%;
    flex: unset;
  }
`;
