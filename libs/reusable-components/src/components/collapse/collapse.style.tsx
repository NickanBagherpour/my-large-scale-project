import { Collapse as AntCollapse } from 'antd';
import styled from 'styled-components';

export const StyledCollapse = styled(AntCollapse)`
  & .ant-collapse-borderless {
    background: transparent;
  }

  & .ant-collapse-item {
    background: ${(p) => p.theme.background.main};
    padding: 1.8rem 0 1.6rem 0;

    &:not(:last-of-type) {
      border-bottom: 0.1rem solid ${(p) => p.theme.border._300};
    }
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
    padding: 1.8rem 0 0;
    background-color: ${(p) => p.theme.background._50};
  }

  & .ant-collapse-header {
    padding: 0;
    align-items: center;
  }

  & .ant-collapse-expand-icon {
    margin: 0;
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
