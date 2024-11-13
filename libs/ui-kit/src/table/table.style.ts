import { Table as AntTable } from 'antd';
import styled, { css } from 'styled-components';

import { cssVar } from '@oxygen/utils';

import { Panel } from '../panel/panel';
import { TableProps } from './table';

export const Wrapper = styled(Panel)`
  padding: 0;
  // min-height: 40rem;
`;

const borderRadius = '1.2rem';

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
  .ant-table-content {
    overflow: ${(p) => (p.variant === 'simple' ? 'hidden' : 'auto')} !important;
    scrollbar-width: thin;
    scrollbar-color: ${(p) => p.theme.border._300} ${(p) => p.theme.background.main};
  }

  ${(p) =>
    p.variant === 'simple' &&
    css`
      table {
        border: 1px solid ${p.theme.border._100};
        border-radius: ${borderRadius};
        box-sizing: border-box;
        /* remove the last row's border */
        & tr:last-child td {
          border: none;
        }
        /* add border-radius to table's corners */
        & tr:last-child td:first-child {
          border-end-start-radius: ${borderRadius};
        }
        & tr:last-child td:last-child {
          border-end-end-radius: ${borderRadius};
        }
        & thead th:first-child {
          border-start-start-radius: ${borderRadius};
        }
        & thead th:last-child {
          border-start-end-radius: ${borderRadius};
        }
      }
    `}

  thead {
    border-color: ${(p) => p.theme.border._100};
  }

  tbody tr {
    // border-radius: 0;
  }

  tbody tr.odd-row {
    background-color: ${(p) => (p.variant === 'simple' ? p.theme.background.main : p.theme.primary._100)};
  }

  tbody tr.odd-row + .ant-table-expanded-row {
    background-color: ${(p) => p.theme.cardColor};
  }

  thead > tr > th {
    padding: 1.4rem !important;
    text-align: center;
    background-color: ${(p) => p.theme.background.main};
    border-top: ${(p) => (p.variant === 'simple' ? 0 : `1px solid `)};
    border-right: ${(p) => (p.variant === 'simple' ? 0 : 'unset')};
    border-left: ${(p) => (p.variant === 'simple' ? 0 : 'unset')};
    border-color: ${(p) => p.theme.border._100};
    box-sizing: border-box !important;
    font-size: ${(p) => (p.variant === 'simple' ? '1.4rem' : '1.2rem')};
    font-weight: 700;
    line-height: ${(p) => (p.variant === 'simple' ? '1.8rem' : '2.2rem')};
  }

  tbody > tr > td {
    text-align: center;
    font-size: ${(p) => (p.variant === 'simple' ? '1.2rem' : '1rem')};
    font-weight: 400;
    line-height: ${(p) => (p.variant === 'simple' ? '1.8rem' : '1.6rem')};
    border-right: ${(p) => (p.variant === 'simple' ? 0 : 'unset')};
    border-left: ${(p) => (p.variant === 'simple' ? 0 : 'unset')};
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
    background-color: ${(p) => (p.variant === 'simple' ? p.theme.background.main : p.theme.background._50)};
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
    padding: 0.5 2rem;
    position: relative;
  }

  li.ant-pagination-item > a {
    color: ${(p) => p.theme.primary.main};
  }
  .ant-pagination-prev,
  .ant-pagination-next,
  .ant-pagination-item-link .anticon {
    color: ${(p) => p.theme.primary.main};
  }
  .ant-pagination-item-ellipsis {
    color: ${(p) => p.theme.primary.main};
  }
  .ant-pagination .ant-select-selector {
    background-color: ${(p) => p.theme.primary.main};
    color: ${(p) => p.theme.onPrimary};
    padding: 1.5rem;
    min-width: 7rem;
  }
  .ant-pagination .anticon-down {
    transform: rotate(180deg);
    margin-top: ${(p) => (p.size === 'small' ? '0.5rem' : 0)};
  }
  .ant-pagination .anticon-search {
    margin-top: ${(p) => (p.size === 'small' ? '0.5rem' : 0)};
  }
  .ant-pagination-item:not(.ant-pagination-disabled):hover,
  .ant-pagination-prev:not(.ant-pagination-disabled):hover,
  .ant-pagination-next:not(.ant-pagination-disabled):hover {
    border-radius: 50% !important;
    background-color: ${(p) => p.theme.primary._100} !important;
    border-color: transparent;
    transition: none !important;
  }
  .ant-pagination-item-link:hover {
    background-color: transparent;
  }
  .ant-pagination-mini .ant-pagination-item {
    margin: 0 0.3rem;
  }
  .ant-pagination-disabled .ant-pagination-item-link .anticon {
    color: ${(p) => p.theme.primary._400} !important;
  }
  .ant-pagination-disabled .ant-pagination-item-link :hover {
    background-color: transparent !important;
  }
  .ant-pagination .ant-select-selection-item {
    color: ${(p) => p.theme.onPrimary};
  }
  .ant-pagination .ant-select-suffix {
    color: ${(p) => p.theme.onPrimary};
  }
  .ant-pagination .ant-select-item-option-active {
    background-color: ${(p) => p.theme.primary._100};
  }
  .ant-pagination-item-active {
    border-radius: 50% !important;
    border-color: transparent;
    background-color: ${(p) => p.theme.primary._100};
  }
  .ant-pagination-options {
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

export const MobileColumnWrapper = styled.div<{ min_height: React.CSSProperties['minHeight'] }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.text.secondary};
  min-height: ${(p) => p.min_height};

  margin-bottom: 1rem;

  .item__btn {
    margin-inline-end: -1.6rem;
  }

  .item__title {
    max-width: 10rem;
  }

  .item__value {
    font-weight: 400;
  }
`;
