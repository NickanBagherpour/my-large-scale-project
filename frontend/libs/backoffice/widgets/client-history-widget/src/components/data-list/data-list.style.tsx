import styled from 'styled-components';

import { Box } from '@oxygen/ui-kit';

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

export const BadgeItemContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const TableContainer = styled(Box)`
  //flex: 1;
  margin-top: 2.4rem;

  & tbody > tr > td {
    color: ${(props) => props.theme.text.tertiary};
  }

  & .ant-pagination .ant-select {
    margin: 0 1.6rem;
  }

  & .ant-table-caption {
    & div {
      padding: 1rem 0.8rem 0.8rem 0.8rem;

      & .caption-title {
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 25px;
        color: ${(props) => props.theme.text.primary};
      }
    }
  }

  &&& .item__title {
    max-width: 11rem;
  }
`;

export const ValueContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.3rem;

  & .ant-badge-status-dot {
    width: 0.8rem;
    height: 0.8rem;
  }
`;
export const EllipsisValueContainer = styled.span<{ width: number }>`
  display: inline-block;
  max-width: ${(props) => props.width}px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
