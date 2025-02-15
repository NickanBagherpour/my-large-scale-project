import styled from 'styled-components';
import { Table as KitTable } from '@oxygen/ui-kit';
import { Typography as AntTypography } from 'antd';

export const Table = styled(KitTable)`
  margin: 0 3rem;
  div.ant-table {
    min-height: auto;
    tr,
    th {
      background-color: ${(p) => p.theme.background._50};
    }
  }
`;

export const ItemWrapper = styled.div`
  max-height: 50vh;
  overflow-y: auto;
  background-color: ${(p) => p.theme.background._50};
  padding-bottom: 5rem;
  border: 1px solid ${(p) => p.theme.border._100};
  border-right: none;
  border-radius: 0.8rem;

  .info-box__value {
    display: flex;
    flex-wrap: wrap;
    row-gap: 1rem;
  }
`;

export const CaptionInfoBox = styled.p`
  margin: 2rem 3.5rem;
  font-weight: bold;
`;

export const TableRow = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RowItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  color: ${(p) => p.theme.text.secondary};
  min-height: 5rem;
  gap: 2rem;

  & > button {
    /* to align buttons with other elements */
    margin-inline-end: -15px;
  }
`;

export const Text = styled(AntTypography.Text)`
  unicode-bidi: normal;

  button {
    margin: 0 1rem;
  }
`;
