import styled from '@emotion/styled';
import { Pagination as MuiPagination } from '@mui/material';

export const Pagination = styled(MuiPagination)<any>`
  &.MuiPagination-root {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.8rem;
  }

  li:first-of-type,
  li:last-of-type {
    /* transform: rotate(180deg); */
  }

  li > button {
    color: ${(p) => p.theme.base.primary};
  }

  .MuiPaginationItem-root.Mui-selected {
    background-color: ${(p) => p.theme.base.primaryLight};
  }
`;
