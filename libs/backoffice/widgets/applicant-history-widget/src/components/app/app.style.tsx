import styled from 'styled-components';

import { Box, Container } from '@oxygen/ui-kit';

export const AppContainer = styled(Container)`
  & .return-button {
    border-color: ${(props) => props.theme.border._500};
  }
`;

export const StyledBox = styled(Box)`
  height: 100%;
`;
