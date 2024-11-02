import styled from 'styled-components';
import { Button as KitButton, MarkText } from '@oxygen/ui-kit';
import RawGrid from '../grid/grid.style';

export const TableContainer = styled.div`
  margin-bottom: 1.6rem;
`;

export const Grid = styled(RawGrid)`
  margin-bottom: 1.6rem;
`;

export const Button = styled(KitButton)`
  display: flex;
  gap: 1rem;
  margin-inline: auto;
`;

export const Name = styled(MarkText)`
  //
`;

export const Scope = styled(MarkText)`
  //
`;

export const Url = styled.a`
  color: ${(p) => p.theme.primary._500};
`;

export const Details = styled.a`
  color: ${(p) => p.theme.primary.main};
`;

export const Trash = styled.i`
  font-size: 2.4rem;
  color: ${(p) => p.theme.error.main};
`;
