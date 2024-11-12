import styled from 'styled-components';
import { Empty as AntEmpty } from 'antd';
import { Box, Button } from '@oxygen/ui-kit';

export const NoResult = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BoxContainer = styled(Box)`
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 1.4rem;
`;

export const Empty = styled(AntEmpty)`
  margin-bottom: 2.4rem;
`;

export const ReturnButton = styled(Button)`
  width: 50%;
`;
