import { respondTo } from '@oxygen/utils';
import { Form } from 'antd';
import styled from 'styled-components';

const formGap = '1.5rem';
export const FormItemsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  column-gap: ${formGap};
  justify-content: space-between;
`;
export const FormItem = styled(Form.Item)`
  flex: 1 1 calc(25% - ${formGap} * 3 / 4);
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
