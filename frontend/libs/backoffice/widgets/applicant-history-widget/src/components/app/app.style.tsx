import styled from 'styled-components';

import { Container } from '@oxygen/ui-kit';

export const AppContainer = styled(Container)`
  height: 100%;

  & .table-container {
    flex: 1;
  }

  & .ant-btn.return-button {
    padding: 0.8rem 4rem;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    text-align: center;
    border-color: ${(props) => props.theme.border.main};
  }
`;
