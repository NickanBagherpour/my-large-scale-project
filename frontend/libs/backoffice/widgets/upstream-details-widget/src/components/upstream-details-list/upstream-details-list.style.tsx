import styled from 'styled-components';
import { MarkText } from '@oxygen/ui-kit';

export const TableContainer = styled.div`
  /* margin-top: 2.4rem; */
  margin-bottom: 3rem;
`;

export const Name = styled(MarkText)`
  //
`;

export const Scope = styled(MarkText)`
  //
`;

export const Url = styled.a`
  color: ${(p) => p.theme.primary._500};
`;

export const Details = styled.a`
  color: ${(p) => p.theme.primary.main};
`;

export const Trash = styled.i`
  font-size: 2.4rem;
  color: ${(p) => p.theme.error.main};
`;

export const MobileTableItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.text.secondary};

  margin-bottom: 1rem;

  .item__title {
    max-width: 10rem;
  }

  .item__value {
    font-weight: 400;
  }
`;
