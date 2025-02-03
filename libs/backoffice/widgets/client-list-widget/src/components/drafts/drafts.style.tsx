import styled from 'styled-components';
import RawGrid from '../grid/grid.style';
import { Button as UiKitButton } from '@oxygen/ui-kit';

export const Grid = styled(RawGrid)`
  margin: 1.6rem 0;
`;

export const Button = styled(UiKitButton)`
  display: flex;
  gap: 1rem;
  margin-inline: auto;
`;
