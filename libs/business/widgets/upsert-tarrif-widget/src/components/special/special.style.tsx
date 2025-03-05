import styled from 'styled-components';
import { Input as UikitInput, Button as UikitButton } from '@oxygen/ui-kit';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Article = styled.article`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  background: ${(p) => p.theme.background.main};
  padding: 1.2rem;
  border: ${(p) => `1px solid ${p.theme.border._100}`};
  border-radius: 1.6rem;
  padding: 2rem 1.2rem; /* need padding for inputs validation errors */

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
`;

export const Index = styled.span`
  padding: 0.4rem 1.2rem;
  color: ${(p) => p.theme.primary.main};
  background: ${(p) => p.theme.primary._50};
  border-radius: 0.8rem;
`;

export const Input = styled(UikitInput)`
  width: 12rem;
`;

export const TrashBtn = styled(UikitButton)`
  font-size: 1.8rem;
  margin-inline-start: auto;
`;
