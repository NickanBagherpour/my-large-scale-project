import styled from 'styled-components';
import { Button } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';

export const Container = styled.div`
  margin-bottom: 1.6rem;
  margin-top: 1.6rem;

  & .ant-collapse-item:nth-of-type(3) .ant-collapse-content-box {
    div {
      grid-template-columns: repeat(3, 1fr);

      ${respondTo.down('lg')} {
        grid-template-columns: repeat(2, 1fr);
      }

      ${respondTo.down('sm')} {
        grid-template-columns: repeat(1, 1fr);
      }
    }
  }
}

& .ant-collapse-content-box {
  & > div {
    margin: 0;
    border-radius: 1.2rem;

    &[min_col] {
      padding: 2.4rem;
      border-color: ${(p) => p.theme.border._300};
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
    margin-inline-end: 0.4rem;
  }
`;

export const StyledButton = styled(Button)`
  border-radius: 50%;
`;
