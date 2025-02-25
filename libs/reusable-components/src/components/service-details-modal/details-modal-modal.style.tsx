import { cssVar } from '@oxygen/utils';
import styled from 'styled-components';

export const Container = styled.section`
  border: ${(p) => `1px solid ${p.theme.border._100}`};
  background-color: ${(p) => p.theme.background._50};
  padding: 2.4rem;
  border-radius: var(${cssVar.radius});
  display: flex;
  flex-direction: column;
  gap: 3.4rem;
  max-height: 70vh;
  overflow-y: auto;

  th,
  td,
  thead,
  tr {
    background-color: transparent !important;
  }
`;

export const Title = styled.h2`
  color: ${(p) => p.theme.primary};
  font-weight: 600;
  font-size: 1.6rem;
  margin-bottom: 2.4rem;
`;

export const Tags = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  && > span {
    margin: 0;
  }
`;
