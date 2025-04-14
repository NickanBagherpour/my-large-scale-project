import styled from 'styled-components';
import { Input as KitInput, Divider as KitDivider } from '@oxygen/ui-kit';
import { FilterPopover as KitFilterPopover } from '@oxygen/reusable-components';
import { respondTo } from '@oxygen/utils';

export const Input = styled(KitInput)`
  max-width: 50.4rem;
  margin-inline-end: auto;
  margin-top: 2.4rem;
  margin-bottom: 2.7rem;

  ${respondTo.down('lg')} {
    max-width: 100%;
    font-size: 1.7rem;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Chips = styled.div`
  display: flex;
  align-items: center;
  margin-inline-end: auto;

  ${respondTo.down('xs')} {
    flex-direction: column;
    gap: 1.5rem;
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

export const FilterPopover = styled(KitFilterPopover)`
  margin-inline-start: auto;
`;
