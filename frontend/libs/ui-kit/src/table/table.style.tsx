import { Table as MuiTable, TableCell as MuiTableCell, TableContainer as MuiTableContainer } from '@mui/material';

import { cssVar } from '@oxygen-portal/utils';

import styled from '@emotion/styled';

// Define reusable variables
const borderRadius = `var(${cssVar.radius})`;
const primaryColor = (props) => props.theme.base.primary;
const onPrimaryColor = (props) => props.theme.base.onPrimary;
const borderColor = (props) => props.theme.base.border;

export const Wrapper = styled.div`
  --table-min-height: 5rem;
  position: relative;
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  .MuiCircularProgress-root {
    margin-top: calc(var(--table-min-height) / 2);
  }
`;

export const TableContainer = styled(MuiTableContainer)`
  border-radius: ${borderRadius};
  border: 1px solid ${borderColor};
`;

export const Table = styled(MuiTable)`
  min-height: var(--table-min-height);

  thead.MuiTableHead-root {
    background-color: ${primaryColor};
    border-radius: ${borderRadius} ${borderRadius} 0 0;
  }

  thead.MuiTableHead-root > tr.MuiTableRow-root > th.MuiTableCell-root {
    color: ${onPrimaryColor};
  }

  tbody.MuiTableBody-root > tr.bordered > td.MuiTableCell-root,
  tbody.MuiTableBody-root > tr.tr-expandable > td.MuiTableCell-root {
    border-bottom: 1px solid ${borderColor};
  }

  tr.tr-clickable {
    cursor: pointer;
  }
`;

export const TableCell = styled(MuiTableCell)`
  .expand-icon-btn {
    color: ${primaryColor};
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 1rem;

  .rows-per-page-select {
    display: flex;
    justify-items: center;
    align-items: center;
    gap: 1rem;

    p.label {
      font-size: 1.4rem;
      font-weight: 500;
      color: ${primaryColor};
    }

    .MuiInputBase-root {
      width: min-content;
      font-size: 1.4rem;
      font-weight: 500;
      color: ${onPrimaryColor};
      padding: 0;
      height: 3.6rem;
      background: ${primaryColor};

      div[role='combobox'] {
        padding: 0 1.6rem;
      }

      button {
        color: ${onPrimaryColor};
        font-size: 1.4rem;
      }
    }
  }
`;
