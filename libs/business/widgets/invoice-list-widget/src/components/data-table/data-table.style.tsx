import styled from 'styled-components';

import { Table as KitTable, Tag as KitTag } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';

export const DataTableContainer = styled.div``;

export const Table = styled(KitTable)`
  & .ant-pagination-options {
    margin-inline-start: 1.6rem;
  }

  & tbody > tr:has(.under-review) > td {
    background-color: ${(p) => p.theme.success._50};

    .rotate-icon {
      transition: transform 0.3s ease-in-out;
    }

    .ant-dropdown-open .rotate-icon {
      transform: rotate(180deg);
    }
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

export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`;
