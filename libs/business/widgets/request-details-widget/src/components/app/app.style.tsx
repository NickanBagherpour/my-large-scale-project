import styled from 'styled-components';

import { Box, Container as UikitContainer } from '@oxygen/ui-kit';

export const AppContainer = styled(UikitContainer)`
  // background-color: pink;
`;
export const LoadingContainer = styled(Box)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Container = styled.div`
  margin-bottom: 1.6rem;
  margin-top: 1.6rem;

  & .ant-collapse-item.organization-info-box .grid-item:nth-last-child(3) {
    grid-column: span 2;
  }

  & .ant-collapse-item.representative-info-box {
    & .grid-item {
      gap: 0;
      font-size: 1.4rem;
      line-height: 2.2rem;
    }
    .info-box__title {
      font-weight: 600;
    }

    .info-box__value {
      font-weight: 400;
    }
  }

  & .ant-collapse-content-box {
    & > div {
      border-radius: 1.2rem;

      &[min_col] {
        padding: 2.4rem;
        border-color: ${(p) => p.theme.border._300};
        row-gap: 2rem;
        column-gap: 2rem;
      }

      .grid-item {
        font-size: 1.2rem;
        line-height: 1.8rem;
        gap: 1.2rem;
      }

      .info-box__title {
        font-weight: 400;
        color: ${(p) => p.theme.text.tertiary};
      }

      .info-box__value {
        font-weight: 500;
        color: ${(p) => p.theme.text.secondary};
      }
    }

    &:not(last-of-type) {
      background-color: transparent;
    }
  }

  & .ant-divider {
    border-color: ${(p) => p.theme.border._100};
    margin: 0 0 0.4rem 0;
  }
`;
