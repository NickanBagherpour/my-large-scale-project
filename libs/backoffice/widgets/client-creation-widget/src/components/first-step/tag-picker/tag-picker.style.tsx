import styled from 'styled-components';
import { respondTo } from '@oxygen/utils';
import { Dropdown } from '@oxygen/ui-kit';
import { Form as AntForm } from 'antd';

export const Form = styled(AntForm)`
  border: 1px solid ${(p) => p.theme.border.main};
  border-radius: 0.8rem;
  padding: 1.6rem;
`;

export const EditClientContainer = styled.div`
  height: 100%;
  display: flex;
  width: 100%;
  flex-direction: column;

  .form-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;

    .cards-title {
      font-weight: bold;
      font-size: 1.6rem;
      margin: 2.4rem 0;
    }
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
`;

export const TagPicker = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1.6rem 1.6rem 1.6rem 0;

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

export const Select = styled(Dropdown.Select)`
  min-width: 20rem;
`;
