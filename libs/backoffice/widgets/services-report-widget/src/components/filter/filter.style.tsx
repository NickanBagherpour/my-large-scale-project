import styled from 'styled-components';
import { Form } from 'antd';

import { Divider as KitDivider, Input as KitInput, Chip as KitChip } from '@oxygen/ui-kit';
import { FilterPopover as KitFilterPopover } from '@oxygen/reusable-components';
import { respondTo } from '@oxygen/utils';

export const Container = styled.section`
  margin: 2.4rem 0;
`;

export const FormItem = styled(Form.Item)`
  margin-bottom: 2.3rem;
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

export const Indicators = styled.div`
  display: flex;
  align-items: center;
`;

export const Input = styled(KitInput)`
  max-width: 50.4rem;
  margin-inline-end: auto;

  ${respondTo.down('md')} {
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

  ${respondTo.down('lg')} {
    align-self: baseline;
  }
`;
