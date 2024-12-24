import styled from 'styled-components';
import { Button } from '@oxygen/ui-kit';

export const DataTableContainer = styled.div`
  .ant-table,
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    background-color: ${(p) => p.theme.background._50};
  }

  .ant-table-tbody > tr:hover > td {
    background-color: ${(p) => p.theme.background._100};
  }
`;

export const Details = styled.span`
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.2rem;
  color: ${(p) => p.theme.primary._600};
`;

export const StyledButton = styled(Button)``;
