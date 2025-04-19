import { cssVar, respondTo } from '@oxygen/utils';
import styled from 'styled-components';
export const Container = styled.div`
  border-radius: var(${cssVar.radiusLg});
  background-color: ${(p) => p.theme.surface};
  display: grid;
  grid-template-columns: auto auto;
  padding: 0rem 3.5rem;
  ${respondTo.between('xl', 'lg')} {
    padding: 0rem 1rem;
  }
`;
export const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
`;
export const Flag = styled.div<{ $color: string }>`
  width: 2.7rem;
  height: 1.3rem;
  border-radius: 20px;
  background-color: ${(p) => p.$color};
`;
export const FlagText = styled.span`
  font-size: 1rem;
`;
export const TotalText = styled.span`
  font-size: 1.2rem;
`;
export const FlagNumber = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
`;
export const ChartDataContainer = styled.div`
  padding-top: 2rem;
`;
