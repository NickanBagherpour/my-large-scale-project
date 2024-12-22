import styled, { css } from 'styled-components';
import { Table as KitTable } from '@oxygen/ui-kit';
import { colorStatusType } from '../../types';

export const DataTableContainer = styled.div``;

export const Table = styled(KitTable)`
  & .ant-pagination-options {
    margin-inline-start: 1.6rem;
  }

  & tbody > tr:has(.ant-btn-color-secondary) > td {
    border-bottom: 1px solid ${(p) => p.theme.success.main};
    background-color: ${(p) => p.theme.success._50};
  }
`;

export const TableRow = styled.div`
  display: flex;
  flex-direction: column;

  div > span.item__value {
    & a,
    button {
      margin-inline-end: -15px;
    }
  }
`;

export const generateBadgeColors = (colorStatus: colorStatusType) => {
  switch (colorStatus) {
    case 'info':
      return css`
        background-color: ${(p) => p.theme.info._50};
        color: ${(p) => p.theme.info.main};
      `;
    case 'error':
      return css`
        background-color: ${(p) => p.theme.error._50};
        color: ${(p) => p.theme.error.main};
      `;
    case 'success':
      return css`
        background-color: ${(p) => p.theme.success._50};
        color: ${(p) => p.theme.success.main};
      `;
    case 'secondary':
      return css`
        background-color: ${(p) => p.theme.secondary._50};
        color: ${(p) => p.theme.secondary.main};
        border: 1px solid ${(p) => p.theme.secondary.main};
      `;
  }
};

export const StyledContainer = styled.span<{ color: colorStatusType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  .label {
    ${(p) => generateBadgeColors(p.color)};
    padding: 0 0.8rem;
    min-height: 2.8rem;
    border-radius: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  i.icon-tick-circle-outlined {
    margin: 0 0.4rem;
    font-size: 20px;
  }
`;
