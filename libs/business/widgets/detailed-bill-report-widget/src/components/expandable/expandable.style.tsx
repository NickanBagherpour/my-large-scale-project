import styled from 'styled-components';

export const Sum = styled.div`
  background: ${(p) => p.theme.secondary.main};
  color: ${(p) => p.theme.onPrimary};
  padding: 2.4rem 3.2rem;
  width: fit-content;
  margin-inline-start: auto;
  border-end-start-radius: 1.2rem;
  border-end-end-radius: 1.2rem;
`;

export const Success = styled.span`
  color: ${(p) => p.theme.secondary.main};
  font-weight: 700;
`;

export const Failure = styled.span`
  color: ${(p) => p.theme.error.main};
  font-weight: 700;
`;

export const TotalCount = styled.span`
  color: ${(p) => p.theme.text.primary};
  font-weight: 700;
`;

export const TotalMoney = styled.span`
  color: ${(p) => p.theme.text.primary};
  font-weight: 700;
`;
