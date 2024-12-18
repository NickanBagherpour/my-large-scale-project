import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';

export const TagPicker = styled.div`
  display: flex;
  flex-direction: row;

  ${respondTo.down('xs')} {
    flex-direction: column;
  }

  .ant-form-item {
    margin: 0;
    padding: 0 1.6rem 0 0;
    border-right: 1px solid ${(p) => p.theme.border.main};
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
    margin: 0.5rem 0 0.5rem 1.6rem;
  }
`;
