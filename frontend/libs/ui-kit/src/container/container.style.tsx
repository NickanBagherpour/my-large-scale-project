import { cssVar, respondTo } from '@oxygen/utils';

import styled from 'styled-components';

export const WidgetWrapperContainer = styled.div<any>`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.primary.main};
  border-radius: var(${cssVar.radius});
  background-color: ${(props) => props.theme.surface};
  padding: 0 1.6rem;
  margin: 1.6rem;
`;

export const BodyContainer = styled.div<any>`
  width: 100%;
  height: max-content;
  background-color: ${(props) => props.theme.surface};
`;

export const Header = styled.div`
  min-height: 6.7rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1.2rem 1.6rem;
  color: ${(props) => props.theme.onPrimary};
  /* border-bottom: 1px solid ${(props) => props.theme.divider}; */

  & .title-divider {
    margin: 0 0.4rem;
  }

  & .header__title {
    font-weight: bold;
    font-size: 1.8rem;
    /* margin: 0 0 0 1rem; */
    color: ${(props) => props.theme.primary.main};
  }

  & .header__subtitle {
    font-weight: 400;
    font-size: 1.4rem;
    margin: 0 0 0 0.4rem;
    color: ${(props) => props.theme.text.tertiary};
  }

  & .header__caption {
    flex-grow: 1;
  }
`;

export const Divider = styled.div`
  height: fit-content;
  border: 1px solid ${(p) => p.theme.border._100};
`;
