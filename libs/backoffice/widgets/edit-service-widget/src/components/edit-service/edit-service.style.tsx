import { respondTo } from '@oxygen/utils';
import { Form } from 'antd';
import styled from 'styled-components';

const formGap = '1.5rem';
export const FormItemsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  column-gap: ${formGap};
  border: 1px solid ${(p) => p.theme.border._300};
  border-radius: 1rem;
  padding: 2rem;
`;
export const TagContainer = styled.div`
  border: 1px solid ${(p) => p.theme.border._300};
  border-radius: 1rem;
  padding-top: 1rem;
  padding-inline-start: 2rem;
  padding-right: 2rem;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  margin-top: 2rem;
`;
export const FormTagItem = styled(Form.Item)`
  flex: 0 1 20%;
`;
export const FormItem = styled(Form.Item)`
  flex: 0 1 calc(33% - ${formGap} * 1 / 2);
  ${respondTo.down('sm')} {
    flex-basis: 100%;
  }
  ${respondTo.between('sm', 'lg')} {
    flex-basis: calc(50% - ${formGap} / 2);
  }
`;
export const LargeFormItem = styled(Form.Item)`
  flex: 0 1 calc(50% - ${formGap} / 2);
  ${respondTo.down('lg')} {
    flex-basis: 100%;
  }
`;
