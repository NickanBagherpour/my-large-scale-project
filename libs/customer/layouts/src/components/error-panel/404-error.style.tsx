import { cssVar, respondTo } from '@oxygen/utils';
import styled from 'styled-components';

export const NotFoundWrapper = styled.div`
  width: 100%;
  height: calc(100vh - var(${cssVar.appBarHeight}));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .not-found-svg {
    width: 50%;
    height: fit-content;

    ${respondTo.down('sm')} {
      width: 100%;
    }
  }
`;

export const ErrorDesc = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .not-found-title {
    font-size: 1.8rem;
    font-weight: bold;
    color: ${(p) => p.theme.text.secondary};
  }
  & .not-found-btns {
    display: flex;
    gap: 2.4rem;
  }
  & .home-btn {
    min-width: 15rem;
  }
  & .back-btn {
    min-width: 17rem;
    border-color: ${(p) => p.theme.primary.main};
    color: ${(p) => p.theme.primary.main};
  }
`;
