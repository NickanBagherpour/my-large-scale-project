import styled from 'styled-components';
import { Button } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';

export const Container = styled.div`
  margin-bottom: 1.6rem;
  margin-top: 2.4rem;

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

  & .ant-collapse-borderless {
    background: transparent;
  }

  & .ant-collapse-item {
    background: ${(p) => p.theme.background.main};
    border-bottom: 0.1rem solid rgb(203, 213, 225);
    padding: 1.6rem 0;
  }

  & .ant-collapse-header-text {
    padding: 1rem 0 0.8rem 0.8rem;
    font-size: 1.6rem;
    color: ${(p) => p.theme.text.primary};
    font-weight: 700;
    line-height: 2.5rem;
  }

  & .ant-collapse-content-box {
    font-size: 1.8rem;
    font-weight: 400;
    line-height: calc(28 / 18);
    color: ${(p) => p.theme.text.primary};
    padding: 1.6rem 0 0;
    background-color: ${(p) => p.theme.background.secondary};

    & div {
      margin: 0;
    }
  }

  & .ant-collapse-header {
    padding: 0;
    align-items: center;
  }

  & .ant-collapse-expand-icon {
    margin: 0;
  }

  & .ant-divider {
    border-color: ${(p) => p.theme.border._100};
  }
`;

export const Expand = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.theme.background.main};
  border-radius: 50%;
`;

export const ExpandIcon = styled.i<{ rotate: boolean }>`
  background-color: ${(p) => p.theme.primary._50};
  border-radius: 100%;
  padding: 0.8rem;
  rotate: ${(p) => (p.rotate ? '180deg' : '0deg')};
  transition: rotate 500ms;
  font-size: 2.4rem;
  color: ${(p) => p.theme.primary.main};
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
`;

export const StyledButton = styled(Button)`
  border-radius: 50%;
`;
