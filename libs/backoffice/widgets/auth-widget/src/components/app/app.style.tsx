import styled from 'styled-components';
import { Box } from '@oxygen/ui-kit';

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  //background-color: red;
`;

export const TopSection = styled(Box)`
  margin-bottom: 4.9rem;
  font-weight: 700;
  font-size: 1.6rem;
`;

export const BottomSection = styled(Box)`
  width: 100%;
`;
