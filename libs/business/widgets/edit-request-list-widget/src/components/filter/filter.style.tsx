import styled from 'styled-components';
import { Input as KitInput } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';

export const Container = styled.section`
  margin: 2.5rem 0;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;

  ${respondTo.down('lg')} {
    flex-direction: column;
    gap: 2rem;
  }
`;

export const Title = styled.span``;

export const Input = styled(KitInput)`
  max-width: 74.3rem;
  margin-inline-end: auto;

  ${respondTo.down('lg')} {
    max-width: 100%;
    font-size: 1.7rem;
  }
`;
