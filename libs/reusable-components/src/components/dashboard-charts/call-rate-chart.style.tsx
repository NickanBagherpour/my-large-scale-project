import { Select as UikitSelect } from '@oxygen/ui-kit';
import { cssVar, respondTo } from '@oxygen/utils';
import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 4rem;
  ${respondTo.down('lg')} {
    flex-direction: column;
    gap: 2rem;
  }
`;
export const Title = styled.div`
  color: ${(p) => p.theme.primary.main};
  font-weight: 500;
  font-size: 1.8rem;
`;
export const Controls = styled.div`
  gap: 2rem;
  display: flex;
  ${respondTo.down('xs')} {
    flex-direction: column;
  }
`;
export const CallRate = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 1.4rem;
  color: ${(p) => p.theme.secondary.main};
  align-items: center;
`;
export const LegendContainer = styled.div`
  direction: ltr;
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 1rem;
  align-items: center;
`;
export const Label = styled.span`
  margin-inline-start: 1rem;
`;
export const SelectIcons = styled.div`
  display: flex;
  color: ${(p) => p.theme.primary.main};
  background-color: ${(p) => p.theme.primary._100};
  font-size: 1.8rem;
  padding: 0.7rem;
  border-radius: var(${cssVar.radius});
  transform: none !important;
  margin-inline-end: -0.5rem;
  gap: 1rem;
  align-items: center;
`;
export const Select = styled(UikitSelect)`
  min-width: 20rem;
  &.ant-select-arrow {
    transform: none !important;
  }
`;
export const Subtitle = styled.span`
  font-size: 12px;
`;
export const Date = styled.div`
  font-size: 1.8rem;
  display: flex;
  gap: 1.5rem;
`;
export const TotalCount = styled.span`
  font-size: 1.2rem;
`;
