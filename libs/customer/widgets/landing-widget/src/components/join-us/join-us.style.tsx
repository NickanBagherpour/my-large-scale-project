import styled from 'styled-components';
import wave from 'apps/customer-portal/public/assets/images/wave.svg';
import Image from 'next/image';
import { Button } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';

const top = 20.7;

export const Container = styled.section`
  background: url('${wave}'), linear-gradient(#1e253a, #1e253a);
  background-repeat: no-repeat;
  background-size: 100%;
  padding: 1px 0 7.8rem;
  margin-top: ${15.2 + top}rem;
  margin-bottom: 8rem;
`;

export const Poster = styled.div`
  background-color: #bbbdc2;
  border-radius: 2rem;
  max-width: 111rem;
  margin: 0 auto 8rem;
  padding-block: 6.7rem;
  margin-top: -${top}rem;
  position: relative;
`;

export const DevImgContainer = styled.div`
  position: relative;
  aspect-ratio: 1.331;
  width: 58.3rem;
  margin-inline: auto;

  ${respondTo.down('md')} {
    width: 100%;
  }
`;

export const DevImg = styled(Image)`
  display: block;
`;

export const Txts = styled.div`
  max-width: 81rem;
  margin-inline: auto;
  padding-inline: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h4`
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 2.4rem;
  color: ${(p) => p.theme.onPrimary};
`;

export const Desc = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 2.26;
  color: ${(p) => p.theme.border._300};
`;

export const PlayBtn = styled(Button)`
  position: absolute;
  top: 50%;
  right: 50%;
  translate: -50% -50%;
  width: fit-content;
  height: fit-content;
  padding: 0;
  width: 8rem;
  aspect-ratio: 1;
`;
