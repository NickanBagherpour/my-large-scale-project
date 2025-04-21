import { Button } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';
import { Skeleton } from 'antd';
import styled from 'styled-components';

export const LegendInfoContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: start;
  margin-top: 1rem;
  align-items: center;
  flex-grow: 1;
  ${respondTo.down('xs')} {
    flex-direction: column;
  }
`;
export const LegendContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-inline-start: 0.5rem;
  margin-inline-end: 5rem;
  align-items: center;
  gap: 1rem;
  ${respondTo.down('lg')} {
    flex-direction: column;
  }
`;
export const CallResultIcon = styled.i`
  font-size: 2.4rem;
`;
export const CallRate = styled.div<{ $iconColor: string }>`
  display: flex;
  gap: 0.5rem;
  font-size: 1.4rem;
  color: ${(p) => p.$iconColor};
  align-items: center;
`;
export const DateContainer = styled.div`
  font-size: 1.8rem;
  display: flex;
  gap: 1.5rem;
  margin-inline-end: 2rem;
  font-weight: 500;
`;
export const Date = styled.span`
  direction: rtl !important;
  min-width: 100px;
`;
export const Subtitle = styled.span`
  font-size: 12px;
  font-weight: 500;
`;
export const TotalCount = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
`;
export const ChartTypeContainer = styled.div`
  display: flex;
  gap: 0;
`;
export const ChartIcon = styled.i`
  font-size: 1.8rem;
`;
export const BaseChartButton = styled(Button)<{ $isActive: boolean }>`
  border-color: ${(p) => p.theme.border.main} !important;
  background-color: ${(p) => (p.$isActive ? p.theme.primary._50 : 'initial')};
  min-width: 10rem;
  font-weight: 500;
`;
export const BarChartButton = styled(BaseChartButton)`
  border-radius: 10000px 0 0 10000px;
`;
export const LineChartButton = styled(BaseChartButton)`
  border-radius: 0 10000px 10000px 0;
`;
export const SkeletonText = styled(Skeleton.Button)`
  max-width: 130px;
`;
