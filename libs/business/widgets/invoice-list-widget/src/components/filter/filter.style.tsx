import styled from 'styled-components';
import { Button as KitButton, Divider as KitDivider, Input as KitInput, Chip as KitChip } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';
import { FilterPopover as KitFilterPopover } from '@oxygen/reusable-components';

export const Container = styled.section`
  margin: 2.8rem 0 4rem;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  margin-bottom: 2.3rem;

  ${respondTo.down('lg')} {
    flex-direction: column;
    gap: 2rem;
  }
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

export const Button = styled(KitButton)`
  font-size: 1.4rem;
`;

export const Indicators = styled.div`
  display: flex;
  align-items: center;
`;

export const Input = styled(KitInput)`
  max-width: 50.4rem;
  margin-inline-end: auto;

  ${respondTo.down('lg')} {
    max-width: 100%;
    font-size: 1.7rem;
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

export const InvoiceRequestButton = styled(Button)`
  justify-self: end;
  align-self: end;

  &&& {
    padding: 0.8rem 3.2rem;
  }

  ${respondTo.down('md')} {
    width: 100%;
  }
`;
