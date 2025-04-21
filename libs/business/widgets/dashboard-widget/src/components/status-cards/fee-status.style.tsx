import { cssVar, respondTo } from '@oxygen/utils';
import { Divider as kitDivider } from '@oxygen/ui-kit';
import styled from 'styled-components';
export const Container = styled.div`
  padding: 2rem 3.5rem;
  border-radius: var(${cssVar.radiusLg});
  background-color: ${(p) => p.theme.surface};
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
  gap: 1rem;
  ${respondTo.between('xl', 'lg')} {
    padding: 2rem 2rem;
  }
`;
export const Header = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
`;
export const Title = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
`;
export const Subtitle = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
`;
export const Chart = styled.div`
  display: grid;
  grid-template-columns: 7fr 3fr;
  width: 100%;
`;
export const Bar = styled.div`
  color: white;
  display: grid;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 3.3rem;
`;
export const SadadBar = styled(Bar)<{ $color: string }>`
  background-color: ${(p) => (p.$color === 'orange' ? p.theme.dashboard.orange : p.theme.dashboard.blue._500)};
  border-radius: 4px 0 0 4px;
`;
export const SadadFee = styled.div<{ $color: string }>`
  color: ${(p) => (p.$color === 'orange' ? p.theme.dashboard.orange : p.theme.dashboard.blue._500)};
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, 0);
  overflow: visible;
`;
export const SadadDivider = styled(kitDivider)<{ $color: string }>`
  border-color: ${(p) => (p.$color === 'orange' ? p.theme.dashboard.orange : p.theme.dashboard.blue._500)};
  transform: translate(50%, 0);
`;

export const BankBar = styled(Bar)<{ $color: string }>`
  background-color: ${(p) => (p.$color === 'orange' ? p.theme.dashboard.orange : p.theme.dashboard.blue._500)};
  border-radius: 0px 4px 4px 0px;
`;
export const BankFee = styled.div<{ $color: string }>`
  color: ${(p) => (p.$color === 'orange' ? p.theme.dashboard.orange : p.theme.dashboard.blue._500)};
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, 0);
`;
export const FeeValue = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  padding-right: 2rem;
  max-width: 100%;
`;
export const BankDivider = styled(kitDivider)<{ $color: string }>`
  transform: translate(50%, 0);
  border-color: ${(p) => (p.$color === 'orange' ? p.theme.dashboard.orange : p.theme.dashboard.blue._500)};
`;
export const ChartLabel = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: visible;
`;
export const Flag = styled.div`
  width: 2.7rem;
  height: 1.3rem;
  border-radius: 20px;
`;
export const SadadFlag = styled(Flag)<{ $color: string }>`
  background-color: ${(p) => (p.$color === 'orange' ? p.theme.dashboard.orange : p.theme.dashboard.blue._500)};
`;
export const BankFlag = styled(Flag)<{ $color: string }>`
  background-color: ${(p) => (p.$color === 'orange' ? p.theme.dashboard.orange : p.theme.dashboard.blue._500)};
`;
export const Text = styled.span`
  font-size: 1rem;
`;
export const Currency = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
`;
