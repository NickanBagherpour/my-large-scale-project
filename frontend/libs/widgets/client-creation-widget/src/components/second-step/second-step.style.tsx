import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';

export const SecondStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const SearchField = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2.4rem;
  align-items: center;
  gap: 2.4rem;
  ${respondTo.down('sm')} {
    flex-direction: column;
  }

  .ant-select {
    width: 100%;
  }
  .auto-complete-p {
    text-align: center;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2.5rem;
    min-width: fit-content;
  }
  .footer {
  }
`;
