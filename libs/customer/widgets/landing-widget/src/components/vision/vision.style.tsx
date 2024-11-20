import styled from 'styled-components';
import { SectionTitle } from '../section-title/section-title.style';

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 12rem;
`;

export const Title = styled(SectionTitle)`
  margin-bottom: 4rem;
`;

export const Desc = styled.p`
  color: ${(p) => p.theme.text.tertiary};
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 2.22;
  max-width: 57.4rem;
`;
