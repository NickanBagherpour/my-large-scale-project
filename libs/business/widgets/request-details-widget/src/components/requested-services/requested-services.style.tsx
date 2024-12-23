import styled from 'styled-components';
import { Table as UIKitTable } from '@oxygen/ui-kit';

export const DataTableContainer = styled.div`
  tbody tr {
    background-color: ${(p) => p.theme.background._50};
  }
`;
export const Table = styled(UIKitTable)``;

export const Details = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  color: ${(p) => p.theme.primary._600};
`;
