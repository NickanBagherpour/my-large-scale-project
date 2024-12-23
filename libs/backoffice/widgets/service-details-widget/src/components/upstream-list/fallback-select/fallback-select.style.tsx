import { cssVar } from '@oxygen/utils';
import styled from 'styled-components';

export const UpstreamCreationContainer = styled.div`
  gap: 2.4rem;
`;
export const BorderBox = styled.div`
  border: 1px solid ${(p) => p.theme.border._100};
  border-radius: var(${cssVar.radius});
  padding: 1.6rem;
`;
export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 32rem;
  input {
    margin-bottom: 2.4rem;
  }
  section {
    flex-grow: 1;
    margin: 0;
  }
`;
export const Title = styled.p`
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2.5rem; /* 156.25% */
`;
export const PaginationBox = styled.div`
  margin: 1.8rem 0 0.8rem 0;
`;
export const DataSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
