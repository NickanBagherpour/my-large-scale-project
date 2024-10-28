import styled from 'styled-components';
import { respondTo } from '@oxygen/utils';

export const FirstStepContainer = styled.div`
  .cards-title {
    font-weight: bold;
    font-size: 1.6rem;
  }

  .tag-input {
    border-right: 1px solid ${(p) => p.theme.border.main};
    display: flex;
    align-items: center;
    flex: 1;
    padding-right: 1rem;
  }

  .tags {
    width: max-content;
  }

  .label-switch {
    display: flex;
    align-items: end;

    div {
      gap: 1rem;
      display: flex;
      align-items: center;

      ${respondTo.down('md')} {
        align-items: start;
      }
    }
  }

  .seperator {
    margin-bottom: 1.6rem;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

export const TagInputBox = styled.div`
  .ant-form-item {
    margin: 0;
  }
`;
