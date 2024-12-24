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
  section {
    margin: 0;
  }
`;
