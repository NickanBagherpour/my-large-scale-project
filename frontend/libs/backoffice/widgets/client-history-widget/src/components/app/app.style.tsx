import styled from 'styled-components';

import { Container } from '@oxygen/ui-kit';
import { cssVar, respondTo } from '@oxygen/utils';

export const AppContainer = styled(Container)`
  height: 100%;

  & .table-container {
    flex: 1;
  }
`;

export const FooterContainer = styled.div<any>`
  display: flex;
  flex-direction: row-reverse;
  border-top: 1px solid ${(p) => p.theme.border._300};
  //margin-left: calc(var(${cssVar.drawerWidth}));
  //width: calc(100% - var(${cssVar.drawerWidth}) - 3rem);
  // bottom: 0;
  // right: 0;
  margin-right: 1.5rem;
  padding: 1.6rem;
  gap: 1.6rem;
  //position: absolute;
  margin-bottom: 1.5rem;
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
    padding: 0.8rem 1.6rem;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    text-align: center;
    border-color: ${(props) => props.theme.border.main};
    min-width: 9.6rem;
  }
`;
