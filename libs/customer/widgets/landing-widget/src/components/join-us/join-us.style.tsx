import styled from 'styled-components';
import bg from 'apps/customer-portal/public/assets/images/join-us-bg.svg';
import { Button } from '@oxygen/ui-kit';
import { getRelatedColor, respondTo } from '@oxygen/utils';

const top = 20.7;

export const Container = styled.section`
  background: url(${bg});
  background-repeat: no-repeat;
  background-size: 100%;
  padding: 1px 0 7.8rem;
  margin-top: ${15.2 + top}rem;
  margin-bottom: 8rem;
  ${respondTo.down('xxl')} {
    background-size: cover;
  }
  ${respondTo.down('md')} {
    margin-top: 15.2rem;
  }
`;

export const Poster = styled.div`
  border-radius: 2rem;
  background: ${(p) => p.theme.background.main};
  overflow: hidden;
  border-radius: 2rem;
  max-width: 111rem;
  margin: 0 auto 8rem;
  padding-block: 6.7rem;
  margin-top: -${top}rem;
  position: relative;
  aspect-ratio: 111 / 57.1;
  ${respondTo.down('md')} {
    margin-top: -5rem;
  }
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
  margin-block: 0 2.4rem;
  color: ${(p) => p.theme.onPrimary};
`;

export const Desc = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 2.26;
  margin-block: 0 4rem;
  color: ${(p) => p.theme.border._300};
`;
