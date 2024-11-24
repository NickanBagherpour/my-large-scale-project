import styled from 'styled-components';
import { respondTo } from '@oxygen/utils';
import { Dropdown } from '@oxygen/ui-kit';

export const TitleTxt = styled.p`
  font-weight: bold;
  font-size: 1.6rem;
  margin: 0;
  padding-top: 0.8rem;
`;

export const FirstStepContainer = styled.div`
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
`;

export const Select = styled(Dropdown.Select)`
  min-width: 20rem;
`;

export const FirstForm = styled.div`
  margin: 4rem 0;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

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
    margin: 0.5rem 0 0.5rem 1.6rem !important;
  }
`;
export const Footer = styled.div`
  display: flex;
  height: 7.2rem;
  align-items: center;
  justify-content: end;
  border-top: 1px solid ${(p) => p.theme.border._100};
  gap: 1.2rem;
`;
