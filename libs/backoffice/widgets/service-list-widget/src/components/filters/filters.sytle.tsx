import styled from 'styled-components';
import { Input as KitInput, Divider as KitDivider, Button as KitButton } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';
import { FilterPopover as KitFilterPopover } from '@oxygen/reusable-components';

export const Container = styled.section`
  margin: 2.8rem 0 2.7rem;
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

  ${respondTo.down('xs')} {
    flex-direction: column;
    gap: 1.5rem;
  }

  ${respondTo.between('lg', 'md')} {
    flex-wrap: wrap;
    gap: 1.5rem;
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  ${respondTo.down('lg')} {
    width: 100%;
    justify-content: space-between;
  }
`;

export const Button = styled(KitButton)`
  &&& {
    font-size: 1.4rem;
  }
`;

export const Indicators = styled.div`
  display: flex;
  align-items: center;

  ${respondTo.between('lg', 'md')} {
    flex-direction: column;
    row-gap: 1.6rem;
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
