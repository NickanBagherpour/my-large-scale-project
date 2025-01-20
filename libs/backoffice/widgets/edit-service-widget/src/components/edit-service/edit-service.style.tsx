import { respondTo } from '@oxygen/utils';
import { Form } from 'antd';
import styled from 'styled-components';
const formGap = '1.6rem';
export const FormItemsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  gap: ${formGap};
  border: 1px solid ${(p) => p.theme.border._300};
  border-radius: 1rem;
  padding: 2rem;
`;
export const TagContainer = styled.div`
  border: 1px solid ${(p) => p.theme.border._300};
  border-radius: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-inline-start: 2rem;
  padding-right: 2rem;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  margin-top: 2rem;
  align-items: center;
`;

export const FormItem = styled(Form.Item)`
  flex: 0 1 calc(33.33% - ${formGap}*2 / 3);
  box-sizing: border-box;
  ${respondTo.down('md')} {
    flex-basis: 100%;
  }
  ${respondTo.between('md', 'lg')} {
    flex-basis: calc(50% - ${formGap} / 2);
  }
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
export const TagFormItem = styled(Form.Item)`
  & label {
    padding-inline-start: 1rem;
    font-size: 1.2rem;
  }
  margin-bottom: 0;

  .ant-form-item-additional {
    margin-top: 0.3rem;
  }

  .ant-col {
    padding-bottom: 0.5rem;
  }
` as typeof Form.Item;
