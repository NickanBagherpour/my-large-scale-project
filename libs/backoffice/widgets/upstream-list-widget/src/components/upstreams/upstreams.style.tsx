import styled from 'styled-components';

import { Box, Button } from '@oxygen/ui-kit';

export const TableContainer = styled(Box)`
  height: 100%;
`;

export const DetailsButton = styled(Button)`
  font-weight: 500;
`;

export const TrashButton = styled(Button)`
  & i {
    font-size: 2.4rem;
  }
`;
