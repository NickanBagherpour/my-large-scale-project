import styled from 'styled-components';
import { Card as AntCard } from 'antd';

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 0.8rem;
  margin: 3.2rem 0 1.6rem 0;
`;
export const TitleText = styled.p`
  margin: 0;
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 2.5rem; /* 156.25% */
`;
export const Icon = styled.i`
  font-size: 2rem;
  color: ${(p) => p.theme.primary.main};
`;
export const Card = styled(AntCard)`
  padding: 1.6rem;

  .ant-card-body {
    padding: 0;
  }
`;
