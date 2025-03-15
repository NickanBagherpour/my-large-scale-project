import styled from 'styled-components';
import { Button as UikitButton } from '@oxygen/ui-kit';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const rowHeight = '40px';

export const Article = styled.article`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 3rem 1rem;
  background: ${(p) => p.theme.background.main};
  padding: 2rem 1.2rem; /* need padding for inputs validation errors */
  border: ${(p) => `1px solid ${p.theme.border._100}`};
  border-radius: 1.6rem;

  & > * {
    height: ${rowHeight};
    line-height: ${rowHeight};
  }

  /* make the specifity of this lower than the Index styles */
  :where(span) {
    font-size: 1.4rem;
    font-weight: 700;
    color: ${(p) => p.theme.text.tertiary};
  }

  .ant-form-item {
    /* reset the margin and add extra padding to the container for the input validation errors */
    margin-bottom: 0;
  }

  .ant-form-item-control-input-content {
    width: 12rem;
  }

  .ant-input-wrapper,
  .ant-input-wrapper input {
    height: ${rowHeight};
  }
`;

export const Index = styled.span`
  min-width: ${rowHeight};
  padding: 0.4rem 1.2rem;
  color: ${(p) => p.theme.primary.main};
  background: ${(p) => p.theme.primary._50};
  border-radius: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TrashBtn = styled(UikitButton)`
  && {
    font-size: 1.8rem;
    margin-inline-start: auto;
  }

  &:disabled {
    display: none;
  }
` as typeof UikitButton;
