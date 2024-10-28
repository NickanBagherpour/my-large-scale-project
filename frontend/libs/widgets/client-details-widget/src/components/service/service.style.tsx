import styled from 'styled-components';

export const Container = styled.section`
  border: ${(p) => `1px solid ${p.theme.border._100}`};
  border-radius: 1.2rem;
  margin-bottom: 1.8rem;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  border-bottom: ${(p) => `1px solid ${p.theme.border._100}`};
  padding: 1.6rem 2.4rem;
  gap: 0.8rem;
`;

export const Tag = styled.p`
  color: ${(p) => p.theme.secondary._800};
  font-weight: 600;
  font-size: 1.2rem;
  background: ${(p) => p.theme.secondary._100};
  padding: 0.5rem 1.5rem;
  border-radius: 2.4rem;
  margin: 0;
`;

export const ServiceName = styled.h4`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: ${(p) => p.theme.text.primary};
`;

export const Body = styled.div``;

export const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 1.6rem 3.6rem;
`;

export const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding-inline: 3.6rem;
`;

export const ItemName = styled.div`
  font-size: 1.2rem;
  margin: 0 0 0.2rem;
  font-weight: 600;
`;

export const ItemValue = styled.div`
  font-size: 1.2rem;
  margin: 0;
  font-weight: 300;
`;

export const Cards = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 1.6rem 2.4rem;
`;
