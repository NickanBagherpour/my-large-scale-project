import styled from 'styled-components';
import { Table as KitTable } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';

export const DataTableContainer = styled.div`
  // background-color: pink;
`;

export const Table = styled(KitTable)`
  & .ant-pagination-options {
    margin-inline-start: 1.6rem;
  }

  ${respondTo.down('md')} {
    && tr:nth-child(odd) {
      background-color: ${(p) => p.theme.primary._50};
    }
  }
`;
