import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';
import { Input as KitInput, Button as KitButton } from '@oxygen/ui-kit';

export const TagsContainer = styled.div`
  .infobox-tags {
    padding: 0.4rem 1rem;
    font-size: 1.1rem;
    min-height: auto;
    height: auto;
    margin-top: 1rem;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
