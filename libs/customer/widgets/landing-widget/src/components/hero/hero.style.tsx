import styled from 'styled-components';
import bg from 'apps/customer-portal/public/assets/images/bg.svg';
import Link from 'next/link';
import { respondTo } from '@oxygen/utils';
import { PaddingBox } from '../padding-box/padding-box.style';

export const Hero = styled.header`
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center bottom;
  min-height: 100vh;
  width: 100%;
  margin-bottom: 3.3rem;
  position: relative;
`;

export const Nav = styled.nav`
  padding: 2rem 5.2rem;
  display: flex;
  align-items: center;
  /* margin-bottom: 4.4rem; */
  margin-bottom: 6rem;
  & svg {
    display: block;
  }
`;

export const AppName = styled.p`
  margin-block: 0;
  font-size: 1.2rem;
  font-weight: 600;
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
  display: block;
  height: 4rem;
`;

export const Title = styled.h1`
  font-size: 4.8rem;
  font-weight: 600;
  color: ${(p) => p.theme.onPrimary};
  margin: 0 0 1.6rem;
  & span {
    font-weight: 300;
    font-size: 3.6rem;
  }
  ${respondTo.down('md')} {
    margin-bottom: 3rem;
  }
`;

export const Slogon = styled.p`
  color: ${(p) => p.theme.onPrimary};
  font-size: 1.8rem;
  margin: 0 0 4rem;
  font-weight: 300;
  line-height: 1.55;
  ${respondTo.down('md')} {
    line-height: 2;
  }
`;

export const Info = styled.div`
  flex: 5;
`;

export const Intro = styled(PaddingBox)`
  display: flex;
  align-items: center;

  ${respondTo.down('lg')} {
    flex-direction: column;
    gap: 7rem;
  }
`;

export const ImgContainer = styled.div`
  position: relative;
  flex: 7.24;
  max-width: 72.4rem;
  aspect-ratio: 725 / 706;
  ${respondTo.down('lg')} {
    width: 100%;
    flex: unset;
  }
`;
