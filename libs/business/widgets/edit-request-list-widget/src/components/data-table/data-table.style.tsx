import styled from 'styled-components';
import { Table as KitTable, Button as KitButton } from '@oxygen/ui-kit';

export const DataTableContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

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

export const Button = styled(KitButton)`
  i.icon-remove {
    font-size: 2rem;
  }
`;
