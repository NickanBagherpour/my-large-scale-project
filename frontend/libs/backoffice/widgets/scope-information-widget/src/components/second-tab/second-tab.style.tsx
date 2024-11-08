import { respondTo, withOpacity } from '@oxygen/utils';
import { Table as UiKitTable } from '@oxygen/ui-kit';
import styled from 'styled-components';

export const container = styled.div`
  display: flex;
  flex-direction: column;
`;
export const SecondTabHeader = styled.div`
  height: 4.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  @media print {
    display: none;
  }
`;
export const SecondTabTitle = styled.p`
  color: ${(p) => p.theme.text};
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.5rem;
  @media print {
    display: none;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  @media print {
    display: none;
  }
`;
export const Icon = styled.i`
  font-size: x-large;
`;
export const Table = styled(UiKitTable)`
  margin-top: 1.6rem;
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
  @media print {
    layout: landscape;
  }
`;
export const ButtonWraper = styled.div<{ background: string }>`
  background-color: ${(p) => withOpacity(p.theme[p.background].main, 5)};
  border-radius: 100%;
`;
