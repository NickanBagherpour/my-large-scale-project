import { Table as KitTable, Button as KitButton } from '@oxygen/ui-kit';
import { Form as AntForm } from 'antd';
import styled from 'styled-components';

export const Form = styled(AntForm)`
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  height: 100%;
  padding-bottom: 4rem;
`;

export const Button = styled(KitButton)`
  display: block;
  margin-inline-start: auto;
`;

export const Table = styled(KitTable)`
  padding-top: 4.3rem;
  margin-bottom: auto;

  && th.ant-table-cell {
    padding: 2.4rem !important;
  }

  && td.ant-table-cell {
    padding: 0.7rem;
  }

  && .odd-row {
    background-color: ${(p) => p.theme.primary._50};
  }
`;
