import styled from 'styled-components';

export const DataTableContainer = styled.div`
  & div.ant-table {
    min-height: fit-content;
  }

  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    background-color: ${(p) => p.theme.background._50};
  }

  .ant-table-tbody > tr:hover > td {
    background-color: ${(p) => p.theme.background._100};
  }

  .ant-table-tbody > tr > td {
    font-weight: 600;
  }
`;

export const EllipsisContainer = styled.span<{ width: number }>`
  display: inline-block;
  max-width: ${(props) => props.width}px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  direction: ${(props) => props.theme.direction};
  text-align: ${(props) => (props.theme.direction === 'rtl' ? 'right' : 'left')};
  unicode-bidi: ${(props) => (props.theme.direction === 'rtl' ? 'plaintext' : 'normal')};
`;
