import { Container, Button as KitButton } from '@oxygen/ui-kit';
import styled from 'styled-components';
import RawGrid from '../grid/grid.style';

export const Grid = styled(RawGrid)`
  margin: 1.6rem 0;
`;

export const RequestsContainer = styled(Container)`
  padding-bottom: 2rem;
`;

export const DraftsContainer = styled(Container)`
  //
`;

export const Button = styled(KitButton)`
  display: flex;
  gap: 1rem;
  margin-inline: auto;
`;
