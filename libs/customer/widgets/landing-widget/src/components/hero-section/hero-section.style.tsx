import styled from "styled-components";

export const Hero = styled.section`
  text-align: center;
  padding: 6rem 2rem;
  background-color: ${({ theme }) => theme.primary.main};
  color: ${({ theme }) => theme.onPrimary};

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 4rem;
  }
`;
