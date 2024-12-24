import styled from 'styled-components';

export const StyledText = styled.p`
  font-size: 1.6rem;
  color: ${(p) => p.theme.primary.main};
`;
export const ServiceCompletenessBox = styled.div`
  border: 1px solid ${(p) => p.theme.border._300};
  border-radius: 1.6rem;
  padding: 0rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 35%;
`;
export const Percent = styled.p`
  color: ${(p) => p.theme.text.quaternary};
  text-align: end;
  width: 100%;
  margin-top: -0.2rem;
`;
export const TickIcon = styled.i`
  color: ${(p) => p.theme.primary.main};
  font-size: 3rem;
`;
