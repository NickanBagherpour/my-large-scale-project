import { respondTo } from '@oxygen/utils';
import { Input as KitInput, Button as KitButton } from '@oxygen/ui-kit';

import styled from 'styled-components';

export const TopSectionContainer = styled.div`
  display: flex;
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
