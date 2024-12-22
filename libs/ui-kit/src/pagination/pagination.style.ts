import styled, { css } from 'styled-components';
import { Pagination as AntPagination } from 'antd';

export const Pagination = styled(AntPagination)`
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
  .ant-pagination {
    .ant-select-selector {
      background-color: ${(p) => p.theme.primary.main};
      color: ${(p) => p.theme.onPrimary};
      /* padding: ${(p) => (p.size === 'small' ? ' 1rem 1rem' : 0)}; */
      min-width: 7rem;
    }
    .ant-select-selection-search {
      padding-top: 0rem;
    }
  }
  .ant-pagination .anticon-down {
    transform: rotate(180deg);
    /* margin-top: ${(p) => (p.size === 'small' ? '0.5rem' : 0)}; */
  }
  .ant-pagination .anticon-search {
    /* margin-top: ${(p) => (p.size === 'small' ? '0.5rem' : 0)}; */
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
    ${(p) =>
      p.align === 'start' || p.align === undefined
        ? css`
            inset-inline-end: 0;
          `
        : css`
            inset-inline-start: 0;
            padding-inline-start: 0.8rem;
          `}
  }
`;
