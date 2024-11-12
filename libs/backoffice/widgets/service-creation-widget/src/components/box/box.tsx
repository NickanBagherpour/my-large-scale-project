import styled from 'styled-components';

const Box = styled.section`
  padding: 1.6rem;
  border: ${(p) => `1px solid ${p.theme.border._300}`};
  border-radius: 0.5rem;
`;

export default Box;
