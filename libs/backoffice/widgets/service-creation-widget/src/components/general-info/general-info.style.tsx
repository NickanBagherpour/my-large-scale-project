import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';
import Box from '../box/box';

export const InputsBox = styled(Box)`
  margin-bottom: 1.6rem;
`;

export const TagPicker = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem 1.6rem;

  ${respondTo.down('xs')} {
    flex-direction: column;
  }

  .ant-form-item-control-input {
    margin: 0;
    padding: 0 1.6rem 0 0;
    border-inline-end: 1px solid ${(p) => p.theme.border.main};
    width: min-content;

    ${respondTo.down('xs')} {
      width: 100%;
      border-right: none;
      padding: 0;
    }
  }

  .ant-btn {
    ${respondTo.down('xs')} {
      width: 100%;
      margin-bottom: 1rem;
    }
  }

  .ant-tag {
    ${respondTo.down('xs')} {
      justify-content: space-between;
    }
  }

  .ant-tag {
    margin: 0;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.4rem;
  ${respondTo.down('lg')} {
    grid-template-columns: repeat(1, 1fr);
  }
`;
