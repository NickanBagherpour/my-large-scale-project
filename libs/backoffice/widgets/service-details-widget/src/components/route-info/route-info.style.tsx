import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';
import { Input as KitInput, Button as KitButton } from '@oxygen/ui-kit';
import { Container } from '@oxygen/ui-kit';

export const ItemsContainer = styled(Container)`
  height: 100%;
`;

export const DataTableContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  ${respondTo.down('lg')} {
    justify-content: end;
    padding-left: 2rem;
  }
`;

export const Button = styled(KitButton)`
  width: 40px;
  height: 40px;
  padding: 0 !important;
  &&& {
    font-size: 1.4rem;
  }
`;

export const TrashIcon = styled.i`
  font-size: 2.4rem;
`;

export const Input = styled(KitInput)`
  max-width: 50.4rem;
  margin-inline-end: auto;

  ${respondTo.down('lg')} {
    max-width: 100%;
    font-size: 1.7rem;
  }
`;
