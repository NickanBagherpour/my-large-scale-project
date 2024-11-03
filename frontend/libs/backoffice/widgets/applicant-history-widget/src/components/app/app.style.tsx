import styled from 'styled-components';

import { Container } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';

export const AppContainer = styled(Container)`
  height: 100%;

  & .table-container {
    flex: 1;
  }

  & [class*='container-style__Divider'] {
    border: 0;
    border-bottom: 1px solid ${(props) => props.theme.border._100};
  }
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
    padding: 0.8rem 4rem;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    text-align: center;
    border-color: ${(props) => props.theme.border.main};
  }
`;
