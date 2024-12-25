import styled from 'styled-components';
import { Button } from '@oxygen/ui-kit';

export const Container = styled.div`
  margin-bottom: 1.6rem;
  margin-top: 1.6rem;

  & .ant-collapse-item.company-info-box .grid-item:nth-last-child(3) {
    grid-column: span 2;
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
  }

  & .ant-divider {
    border-color: ${(p) => p.theme.border._100};
    margin: 0 0 0.4rem 0;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  i {
    font-size: 2.4rem;
    color: ${(p) => p.theme.background.main};
  }
`;

export const CollapseTitle = styled.span`
  display: flex;
  justify-content: flex-start;
  gap: 1.6rem;

  & .status-icon {
    font-size: 2rem;
  }
`;

export const StyledButton = styled(Button)`
  border-radius: 50%;
`;
