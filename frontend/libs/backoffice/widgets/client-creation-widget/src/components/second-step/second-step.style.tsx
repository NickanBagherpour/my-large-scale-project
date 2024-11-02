import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';
import { Table as antTable } from '@oxygen/ui-kit';

export const SecondStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const SearchField = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2.4rem 0;
  align-items: center;
  gap: 2.4rem;
  ${respondTo.down('sm')} {
    flex-direction: column;
  }

  .ant-select {
    width: 100%;
  }
  .auto-complete-p {
    text-align: center;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2.5rem;
    min-width: fit-content;
  }
  .footer {
  }
  .table {
    padding: 0;
  }
`;
export const Table = styled(antTable)`
  & .ant-table-content table {
    padding: 0;
  }
  /* .ant-spin-nested-loading .ant-spin-container .ant-table .ant-table-container .ant-table-content table {
    padding: 0;
  } */
`;
