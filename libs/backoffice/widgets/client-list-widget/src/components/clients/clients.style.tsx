import styled from 'styled-components';
import { Button as KitButton } from '@oxygen/ui-kit';
import RawGrid from '../grid/grid.style';

export const Grid = styled(RawGrid)`
  margin-bottom: 1.6rem;
`;

export const Button = styled(KitButton)`
  display: flex;
  gap: 1rem;
  margin-inline: auto;
`;
