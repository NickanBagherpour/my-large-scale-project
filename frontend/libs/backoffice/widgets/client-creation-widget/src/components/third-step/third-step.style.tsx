import styled from 'styled-components';

export const ThirdStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
export const Footer = styled.div`
  display: flex;
  height: 7.2rem;
  align-items: center;
  justify-content: end;
  border-top: 1px solid ${(p) => p.theme.border._100};
  gap: 1.2rem;
`;
