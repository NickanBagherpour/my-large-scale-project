import styled from 'styled-components';

import { Box, Button } from '@oxygen/ui-kit';

export const TableContainer = styled(Box)`
  height: 100%;
`;

export const DetailsButton = styled(Button)`
  font-weight: 500;
  padding: 0 0.8rem;
`;

export const TrashButton = styled(Button)`
  padding: 0 0 0 0.8rem;
  & i {
    font-size: 2.4rem;
  }
`;
