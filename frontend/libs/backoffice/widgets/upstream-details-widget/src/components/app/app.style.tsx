import styled from 'styled-components';

import { Container, MarkText } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';

// import RawGrid from '../grid/grid.style';

// export const Grid = styled(RawGrid)`
//   margin: 1.6rem 0;
// `;

export const DraftsContainer = styled(Container)`
  margin-bottom: 1.6rem;
`;

export const UpstreamDetailsContainer = styled(Container)`
  padding-bottom: 2rem;
  height: 100%;

  & .table-container {
    flex: 1;
  }

  & [class*='container-style__Divider'] {
    border: 0;
    border-bottom: 1px solid ${(props) => props.theme.border._100};
  }
`;

export const AppContainer = styled.div`
  // background-color: pink;
`;

export const FooterContainer = styled.div<any>`
  display: flex;
  flex-direction: row-reverse;
  border-top: 1px solid ${(p) => p.theme.border._100};
  padding: 1.6rem 0;
  gap: 1.6rem;
  background-color: ${(props) => props.theme.background.main};
  flex: 0 0 auto;

  @media print {
    display: none;
  }

  ${respondTo.down('xs')} {
    flex-direction: column;
  }

  ${respondTo.down('lg')} {
    width: calc(100% - 3rem);
  }

  & .ant-btn.return-button {
    /* padding: 0.8rem 4rem;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    text-align: center;*/
    border-color: ${(props) => props.theme.border.main};
    min-width: 12.8rem;
  }

  & .ant-btn.register-button {
    /* padding: 0.8rem 4rem;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    text-align: center; */
    /* border-color: ${(props) => props.theme.border.main}; */
    min-width: 12.8rem;
  }
`;

export const ModalMessage = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.5rem;
  align-items: center;

  .delete-modal {
    background-color: red;
  }
`;

export const ServiceName = styled(MarkText)`
  margin: 0.4rem;
`;
