import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';
import { Table as antTable, Button } from '@oxygen/ui-kit';

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
`;
export const Table = styled(antTable)`
  &.ant-table-wrapper {
    display: flex;
    flex-grow: 1;
  }
  .ant-spin-nested-loading {
    width: 100%;
  }
  & .ant-table-content table {
    padding: 0;
  }
  /* .ant-spin-nested-loading .ant-spin-container .ant-table .ant-table-container .ant-table-content table {
    padding: 0;
  } */
  ${respondTo.down('md')} {
    && tr:nth-child(odd) {
      background-color: ${(p) => p.theme.primary._50};
    }
  }
`;
export const TrashIcon = styled.i`
  font-size: 2.4rem;
`;

export const StatusTxt = styled.p`
  color: ${(p) => p.theme.text.quaternary};
  font-weight: 600;
`;

export const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  justify-content: center;
`;
export const DetailsBtn = styled(Button)`
  font-weight: 600;
`;

export const TableRow = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RowItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  color: ${(p) => p.theme.text.secondary};
  min-height: 5rem;
  gap: 2rem;

  & > button {
    /* to align buttons with other elements */
    margin-inline-end: -15px;
  }
`;

export const Footer = styled.div`
  display: flex;
  height: 7.2rem;
  align-items: center;
  justify-content: end;
  border-top: 1px solid ${(p) => p.theme.border._100};
  gap: 1.2rem;
`;
