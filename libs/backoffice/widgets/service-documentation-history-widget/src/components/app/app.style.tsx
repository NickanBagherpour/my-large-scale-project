// import styled from 'styled-components';
// import { Container } from '@oxygen/ui-kit';

// export const AppContainer = styled(Container)`
//   // background-color: pink;
// `;

import { Container } from '@oxygen/ui-kit';
import styled from 'styled-components';

export const HistoryContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;
export const TableContainer = styled.div`
  flex-grow: 1;
`;
export const SubtitleContainer = styled.div`
  margin: 3rem 0;
  font-weight: bold;
  font-size: 1.6rem;
  color: ${(props) => props.theme.text.primary};
`;
