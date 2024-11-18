import styled from 'styled-components';

import { Box } from '@oxygen/ui-kit';

export const TableContainer = styled(Box)``;

export const ValueContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;

  & .ant-badge-status-dot {
    width: 0.8rem;
    height: 0.8rem;
  }
`;
