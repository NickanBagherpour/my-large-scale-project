import styled from 'styled-components';

export const TableContainer = styled.div`
  & .ant-pagination {
    padding: 0.5rem 2rem;
  }
  & .ant-pagination-options {
    margin: 0 1.6rem 0 2.5rem;
  }
  & td.left-to-right {
    direction: ${(props) => props.theme.direction};
  }
  & td.right-to-left {
    direction: ${(props) => (props.theme.direction === 'rtl' ? 'ltr' : 'rtl')};
  }
`;
