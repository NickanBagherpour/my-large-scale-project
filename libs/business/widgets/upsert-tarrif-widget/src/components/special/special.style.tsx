import styled from 'styled-components';
import { Input as UikitInput, Button as UikitButton } from '@oxygen/ui-kit';
import { Form as AntForm } from 'antd';

export const Form = styled(AntForm)`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Article = styled.article`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${(p) => p.theme.background.main};
  padding: 1.2rem;
  border: ${(p) => `1px solid ${p.theme.border._100}`};
  border-radius: 1.6rem;

  /* make the specifity of this lower than the Index styles */
  :where(span) {
    font-size: 1.4rem;
    font-weight: 700;
    color: ${(p) => p.theme.text.tertiary};
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
