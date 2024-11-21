import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';

export const PaddingBox = styled.div`
  padding-inline: 12rem;

  ${respondTo.down('lg')} {
    padding-inline: 6rem;
  }

  ${respondTo.down('md')} {
    padding-inline: 3rem;
  }
`;
