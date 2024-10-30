import styled from 'styled-components';

export const SubtitleContainer = styled.div`
  margin: 3rem 0;
  font-weight: bold;
  font-size: 1.6rem;
  color: ${(props) => props.theme.text.primary};
`;
export const TableContainer = styled.div`
  tr:nth-child(even) {
    background-color: ${(props) => props.theme.primary._100} !important;
  }
  tr:nth-child(odd) {
    background-color: ${(props) => props.theme.lightGray} !important;
  }
  & .ant-pagination {
    padding: 0.5rem 2rem;
  }
  & .ant-pagination-options {
    margin: 0 1.6rem 0 2.5rem;
  }
  & td.left-to-right {
    direction: rtl;
  }
`;
