import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';
import { Input as UiKitInput } from '@oxygen/ui-kit';

export const Input = styled(UiKitInput)`
  margin-bottom: 2.4rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem 1.6rem;
  margin-bottom: 3rem;

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

export const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${(p) => p.theme.text.primary};
  margin-block: 0 1.6rem;
`;
