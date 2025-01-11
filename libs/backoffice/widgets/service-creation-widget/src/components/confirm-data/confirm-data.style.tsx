import styled from 'styled-components';

export const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${(p) => p.theme.text.primary};
  margin-block: 2.4rem;
`;

export const Section = styled.div`
  margin-bottom: 3rem;
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  .ant-tag {
    margin: 0;
  }
`;

export const ErrorsList = styled.ul`
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export const ErrMsg = styled.span`
  color: ${(p) => p.theme.text.primary};
  font-size: 1.2rem;
  margin-inline-end: 0.5rem;
`;

export const ErrIcon = styled.i`
  color: ${(p) => p.theme.error.main};
  font-size: 2.4rem;
  margin-inline-end: 1rem;
`;

export const ErrCode = styled.span`
  color: ${(p) => p.theme.error.main};
  font-size: 1.2rem;
`;

export const RequestError = styled.li`
  display: flex;
  align-items: center;
`;
