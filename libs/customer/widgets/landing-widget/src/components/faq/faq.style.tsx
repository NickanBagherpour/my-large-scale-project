import styled from 'styled-components';
import { SectionTitle } from '../section-title/section-title.style';

export const Title = styled(SectionTitle)`
  margin-bottom: 4rem;
`;

export const Container = styled.section`
  padding-inline: 12rem;

  & .ant-collapse-item {
    margin-bottom: 24px;
    background: rgb(255, 255, 255);
    border-radius: 1.2rem;
    border: 1px solid rgb(203, 213, 225);
    transition: border 500ms, background-color 500ms;
  }

  & .ant-collapse-item-active {
    border: ${(p) => `1px solid ${p.theme.primary.main}`};
    background: ${(p) => p.theme.primary._50};
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
  font-size: 1.4rem;
`;
