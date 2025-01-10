import styled from 'styled-components';

import { Box, Button } from '@oxygen/ui-kit';
import Link from 'next/link';

export const TableContainer = styled(Box)`
  height: 100%;
`;

export const StyledButton = styled(Button)`
  display: flex;
  margin-inline: auto;
  font-weight: 600;

  & i {
    font-size: 1.8rem;
  }
`;

export const Details = styled(Link)`
  color: ${(p) => p.theme.primary.main};
  font-size: 1.4rem;
`;

export const Trash = styled.i`
  font-size: 2.4rem;
  color: ${(p) => p.theme.error.main};
`;
