import styled from 'styled-components';
import { Button as KitButton } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';

export const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.6rem;
  margin-bottom: 1.6rem;

  ${respondTo.down('xxl')} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${respondTo.down('xl')} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${respondTo.down('lg')} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Button = styled(KitButton)`
  display: flex;
  gap: 1rem;
  margin-inline: auto;
`;
