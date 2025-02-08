import { Container } from '@oxygen/ui-kit';
import styled from 'styled-components';
import RawGrid from '../grid/grid.style';
import { Button as KitButton } from '@oxygen/ui-kit';
export const Grid = styled(RawGrid)`
  margin: 1.6rem 0;
`;

export const DraftsContainer = styled(Container)`
  //margin-bottom: 1.6rem;
`;
export const Button = styled(KitButton)`
  display: flex;
  gap: 1rem;
  margin-inline: auto;
`;
