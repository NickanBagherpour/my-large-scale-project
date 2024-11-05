import styled from 'styled-components';

import { Container } from '@oxygen/ui-kit';

export const UpstreamContainer = styled(Container)`
  padding-bottom: 2rem;

  & .header__title {
    font-weight: 500;
  }

  & [class*='container-style__Divider'] {
    border: 0;
    border-bottom: 1px solid ${(props) => props.theme.border._100};
  }
`;
