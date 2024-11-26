import styled from 'styled-components';
import { SectionTitle } from '../section-title/section-title.style';
import { PaddingBox } from '../padding-box/padding-box.style';

export const Title = styled(SectionTitle)`
  margin-bottom: 4rem;
`;

export const Container = styled(PaddingBox)`
  margin-bottom: 8rem;

  & .ant-collapse-borderless {
    background: transparent;
  }

  & .ant-collapse-item {
    margin-bottom: 2.4rem;
    background: ${(p) => p.theme.background.main};
    border-radius: 1.2rem;
    border: 0.1rem solid rgb(203, 213, 225);
    transition: border 500ms, background-color 500ms;
    padding: 2.4rem;
  }

  & .ant-collapse-item-active {
    border: ${(p) => `1px solid ${p.theme.primary.main}`};
    background: ${(p) => p.theme.primary._50};
  }

  & .ant-collapse-header-text {
    font-size: 2rem;
    color: ${(p) => p.theme.text.primary};
    font-weight: 600;
    line-height: calc(32 / 20);
  }

  & .ant-collapse-content-box {
    font-size: 1.8rem;
    font-weight: 400;
    line-height: calc(28 / 18);
    color: ${(p) => p.theme.text.primary};
  }

  & .ant-collapse-content-box {
    padding: 2rem 0 0;
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
  rotate: ${(p) => (p.rotate ? '180deg' : '0deg')};
  transition: rotate 500ms;
  font-size: 2rem;
  color: ${(p) => p.theme.primary.main};
`;
