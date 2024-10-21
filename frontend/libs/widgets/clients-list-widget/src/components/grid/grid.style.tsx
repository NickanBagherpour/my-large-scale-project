import styled from 'styled-components';
import { Button as KitButton } from '@oxygen/ui-kit';

export const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.6rem;
  margin-bottom: 1.6rem;
`;

export const Button = styled(KitButton)`
  margin-inline: auto;
`;
