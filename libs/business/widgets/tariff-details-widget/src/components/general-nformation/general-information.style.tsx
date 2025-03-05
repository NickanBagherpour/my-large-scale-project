import styled from 'styled-components';

export const GeneralInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.4rem;
  gap: 1.6rem;
`;
export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.8rem;
`;
export const Title = styled.p`
  color: ${(p) => p.theme.text.primary};
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.5rem;
`;

export const BTNContainer = styled.div`
  display: flex;
  gap: 1.2rem;
`;
export const EditIcon = styled.i`
  font-size: 1.8rem;
`;
export const DetailIcon = styled.i`
  font-size: 1.8rem;
`;
