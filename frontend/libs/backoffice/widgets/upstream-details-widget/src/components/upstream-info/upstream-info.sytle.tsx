import styled from 'styled-components';
import { Input as KitInput, Divider as KitDivider, Button as KitButton } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';
import { FilterPopover as KitFilterPopover } from '@oxygen/reusable-components';

export const UpstreamInfoContainer = styled.section`
  /* margin: 2.8rem 0 4rem 0; */
  margin-top: 2.4rem;
`;

export const InfoItemsContainer = styled.div`
  // user input values
  --grid-layout-gap: 1.4rem;
  --grid-column-count: 2; /* This gets overridden by an inline style. */
  --grid-item--min-width: 12rem; /* This gets overridden by an inline style. */

  // calculated values
  --gap-count: calc(var(--grid-column-count) - 1);
  --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
  --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

  display: grid;
  //grid-template-columns: repeat(auto-fill, minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr);
  grid-template-columns: repeat(var(--grid-column-count), 1fr);
  grid-column-gap: var(--grid-layout-gap);

  ${respondTo.down('lg')} {
    grid-template-columns: 1fr 1fr;
  }

  ${respondTo.down('xs')} {
    grid-template-columns: 1fr;
  }
`;

export const Inputs = styled.div`
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

export const UpstreamServerTitle = styled.span`
  font-size: 1.6rem;
  line-height: 2.5rem;
  font-weight: 500;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  margin-bottom: 2.3rem;

  /* ${respondTo.down('sm')} {
    flex-direction: column;
    gap: 2rem;
  } */
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
