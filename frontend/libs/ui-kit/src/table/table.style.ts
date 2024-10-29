import { Table as AntTable } from 'antd';
import styled from 'styled-components';

import { cssVar } from '@oxygen/utils';

import { Panel } from '../panel/panel';
import { TableProps } from './table';

export const Wrapper = styled(Panel)`
  padding: 0;
  // min-height: 40rem;
`;

export const Table = styled(AntTable)<TableProps>`
  --table-min-height: 20rem;

  div.ant-table {
    min-height: var(--table-min-height);
  }

  .ant-table-container::before {
    box-shadow: none !important;
  }

  tr.ant-table-placeholder {
    height: var(--table-min-height);
  }

  table {
    border: ${(p) => (p.variant === 'simple' ? `1px solid ` : 0)};
    border-color: ${(p) => (p.variant === 'simple' ? p.theme.border._100 : 'transparent')};
    border-radius: 0.6rem;
    padding-top: ${(p) => (p.variant === 'simple' ? `0.6rem ` : 0)};
    padding-bottom: ${(p) => (p.variant === 'simple' ? `0.6rem ` : 0)};
  }

  thead {
    border-color: ${(p) => p.theme.border._100};
  }

  tbody tr {
    border-radius: 0;
  }

  tbody tr.odd-row {
    background-color: ${(p) => (p.variant === 'simple' ? p.theme.background.main : p.theme.primary._100)};
  }

  tbody tr.odd-row + .ant-table-expanded-row {
    background-color: ${(p) => p.theme.cardColor};
  }

  thead > tr > th {
    padding: 1.4rem !important;
    background-color: ${(p) => p.theme.background.main};
    border-top: ${(p) => (p.variant === 'simple' ? 0 : `1px solid ${(p) => p.theme.border._100}`)};
    border-color: ${(p) => p.theme.border._100};

    font-size: ${(p) => (p.variant === 'simple' ? '1.4rem' : '1.2rem')};
    font-weight: 700;
    line-height: ${(p) => (p.variant === 'simple' ? '1.8rem' : '2.2rem')};
  }

  tbody > tr > td {
    border-color: ${(p) => (p.variant === 'simple' ? p.theme.divider : p.theme.border._100)};
    font-size: ${(p) => (p.variant === 'simple' ? '1.2rem' : '1rem')};
    font-weight: 400;
    line-height: ${(p) => (p.variant === 'simple' ? '1.8rem' : '1.6rem')};
  }

  thead > tr > th::before {
    width: 0 !important;
  }

  thead > tr > th::before,
  thead > tr > td::before {
    width: 0 !important;
  }

  thead,
  tbody tr.even-row {
    background-color: ${(p) => (p.variant === 'simple' ? p.theme.background.main : p.theme.border._50)};
  }

  tbody tr.even-row + .ant-table-expanded-row {
    background-color: ${(p) => p.theme.surface};
  }

  tbody tr.ant-table-row:hover {
    cursor: pointer;
  }

  .ant-table-row-selected > td {
    background-color: inherit !important;
  }

  .ant-pagination {
    //too much padding
    padding: 2.4rem 3rem;
    position: relative;
  }

  .ant-pagination-options {
    //no margin on the right
    order: -1;
    margin: 0 1.6rem 0 0;
    position: absolute;
    left: 0;
  }
  .ant-btn-icon {
    margin: 0;
  }

  & div.ant-table-empty table > tbody > tr.ant-table-placeholder > td {
    border-bottom: 0;
  }

  & table > thead > tr:first-child > *:first-child,
  & table > thead > tr:first-child > *:last-child {
    border-start-start-radius: 0 !important;
    border-start-end-radius: 0 !important;
  }
`;

export const Caption = styled.div`
  background-color: ${(p) => p.theme.surface};
  color: ${(p) => p.theme.text.primary};
  border-radius: var(${cssVar.radius});
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2.4rem 3rem;

  .caption-title {
    font-size: 1.8rem;
    font-weight: 500;
    text-align: left;
    margin-right: 2rem;
  }

  .caption-items {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
`;

export const MobileColumnWrapper = styled.div`
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
