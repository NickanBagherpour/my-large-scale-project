import styled from 'styled-components';

export const TableContainer = styled.div`
  & td.left-to-right {
    direction: ${(props) => props.theme.direction};
  }
  & td.right-to-left {
    direction: ${(props) => (props.theme.direction === 'rtl' ? 'ltr' : 'rtl')};
  }
`;
