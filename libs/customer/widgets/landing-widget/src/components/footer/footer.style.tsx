import styled from 'styled-components';

export const Container = styled.footer`
  background: #697077;
  padding: 1.2rem 15.7rem;
  display: flex;
  align-items: center;

  & p {
    color: ${(p) => p.theme.onPrimary};
    font-size: 1.4rem;
  }
`;

export const PhoneNum = styled.p`
  margin-block: 0 1rem;
`;

export const Email = styled.p`
  margin-block: 0;
`;

export const Name = styled.p`
  margin-inline: auto;
  margin-block: 0;
`;
