import styled from 'styled-components';
import { Table as KitTable, Tag as KitTag } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';

export const DataTableContainer = styled.div``;

export const Table = styled(KitTable)`
  & .ant-pagination-options {
    margin-inline-start: 1.6rem;
  }

  & tbody > tr:has(.ant-btn-color-secondary) > td {
    border-bottom: 1px solid ${(p) => p.theme.success.main};
    background-color: ${(p) => p.theme.success._50};
  }
`;

export const TableRow = styled.div`
  display: flex;
  flex-direction: column;

  div > span.item__value {
    & a,
    button {
      margin-inline-end: -15px;
    }
  }
`;

export const StyledContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  i.icon-tick-circle-outlined {
    margin: 0.3rem 0.4rem;
    font-size: 20px;
  }
`;

export const Tag = styled(KitTag)`
  ${respondTo.down('md')} {
    margin-inline: 0;
  }
`;
