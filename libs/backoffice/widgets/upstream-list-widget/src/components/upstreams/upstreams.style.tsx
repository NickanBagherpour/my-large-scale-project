import styled from 'styled-components';

import { Box, Button } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';

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

export const ActionBox = styled(Box)`
  display: flex;
  gap: 2rem;

  ${respondTo.down('lg')} {
    gap: 1rem;
  }

  & .ant-btn {
    ${respondTo.down('lg')} {
    }

    padding: 0;
  }
`;
