import { cssVar } from '@oxygen/utils';
import styled from 'styled-components';

const BorderedSection = styled.section`
  padding: 1.6rem;
  border: ${(p) => `1px solid ${p.theme.border._300}`};
  border-radius: var(${cssVar.radius});
`;

export default BorderedSection;
