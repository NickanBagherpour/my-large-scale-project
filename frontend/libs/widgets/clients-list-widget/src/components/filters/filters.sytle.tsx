import styled from 'styled-components';
import { Input as KitInput } from '@oxygen/ui-kit';

export const Container = styled.section`
  margin-bottom: 4rem;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  margin-bottom: 2.3rem;
`;

export const Input = styled(KitInput)`
  max-width: 50.4rem;
  margin-inline-end: auto;
`;
