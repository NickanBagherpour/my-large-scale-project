import styled from 'styled-components';
import { Select as UikitSelect } from '@oxygen/ui-kit';
import { cssVar, respondTo } from '@oxygen/utils';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 5rem 2rem 1rem;
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
export const ButtonText = styled.span`
  font-weight: 700;
`;
export const Label = styled.span`
  margin-inline-start: 1rem;
`;
export const SelectIcons = styled.div`
  display: flex;
  color: ${(p) => p.theme.secondary.main};
  background-color: ${(p) => p.theme.secondary._50};
  font-size: 1.8rem;
  padding: 0.7rem;
  border-radius: var(${cssVar.radius});
  transform: none !important;
  margin-inline-end: -0.5rem;
  gap: 1rem;
  align-items: center;
`;
export const Select = styled(UikitSelect)`
  min-width: 22rem;
  &.ant-select-arrow {
    transform: none !important;
  }
`;
export const Icon = styled.i`
  font-size: 1.8rem;
`;
