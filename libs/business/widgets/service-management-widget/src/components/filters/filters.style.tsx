import { respondTo } from '@oxygen/utils';
import { Input as KitInput, Button as KitButton, Chip as KitChip, Divider as KitDivider } from '@oxygen/ui-kit';
import { FilterPopover as KitFilterPopover } from '@oxygen/reusable-components';

import styled from 'styled-components';

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  margin: 2.4rem 0;

  ${respondTo.down('sm')} {
    flex-direction: column;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  ${respondTo.down('sm')} {
    width: 100%;
    justify-content: space-between;
  }
`;

export const Button = styled(KitButton)`
  ${respondTo.down('sm')} {
    width: 100%;
  }
`;

export const Input = styled(KitInput)`
  max-width: 50.4rem;
  margin-inline-end: auto;

  ${respondTo.down('lg')} {
    max-width: 100%;
    font-size: 1.7rem;
  }
`;
export const FilterPopover = styled(KitFilterPopover)`
  margin-inline-start: auto;
`;
export const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Indicators = styled.div`
  width: 100%;
  margin-top: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Chips = styled.div`
  display: flex;
  align-items: center;
  margin-inline-end: auto;
  flex-wrap: wrap;
  row-gap: 1rem;

  ${respondTo.down('sm')} {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const Chip = styled(KitChip)`
  &.ant-tag {
    cursor: pointer;
  }
`;
export const Divider = styled(KitDivider)`
  height: 2.1rem;
  border-color: ${(p) => p.theme.primary.main};
  margin-inline-start: 0;
  margin-inline-end: 2rem;

  ${respondTo.down('sm')} {
    display: none;
  }
`;
