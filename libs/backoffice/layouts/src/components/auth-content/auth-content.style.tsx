import { cssVar, respondTo } from '@oxygen/utils';
import styled from 'styled-components';
import authLooper from 'apps/backoffice-portal/public/assets/images/auth-looper.svg';
import cardCover from 'apps/backoffice-portal/public/assets/images/cardCover.svg';

export const Main = styled.main`
  min-height: calc(100vh - 1px - var(${cssVar.appBarHeight}));
  background: ${(p) => p.theme.background._100};
  display: flex;
  flex-direction: column;
`;

export const WithImgBackground = styled.div`
  background-image: url(${authLooper});
  background-repeat: no-repeat;
  background-size: cover;
  background-color: ${(p) => p.theme.background._50};
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.div`
  padding: 3.2rem 1.7rem;
  box-shadow: 0rem 0.1rem 0.2rem 0rem rgba(0, 0, 0, 0.3), 0rem 0.2rem 0.6rem 0.2rem rgba(0, 0, 0, 0.15);
  background-color: ${(p) => p.theme.background.main};
  border-radius: 2rem;
  width: min(49rem, 100%);

  background-image: url(${cardCover});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;

  ${respondTo.down('sm')} {
    padding: 2rem 1rem;
    margin: 0 1rem;
  }
`;
