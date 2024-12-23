import { cssVar } from '@oxygen/utils';
import styled from 'styled-components';

export const BorderBoxContainer = styled.div`
  border: 1px solid ${(p) => p.theme.border._100};
  border-radius: var(${cssVar.radius});
  padding: 1.6rem;
`;

export const Table = styled.div`
  margin-top: 2.4rem;
`;
export const Title = styled.p`
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2.5rem; /* 156.25% */
`;
