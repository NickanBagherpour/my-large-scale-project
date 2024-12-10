import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { SearchItemsContainer } from '@oxygen/ui-kit';

import { nameInputsSchema } from 'libs/backoffice/widgets/service-details-widget/src/types';
import {
  MAX_LENGTH_INPUT,
  UPSTREAM_TAB_NAMES_FORM_ITEM,
} from 'libs/backoffice/widgets/service-details-widget/src/utils/consts';

import * as S from './name-inputs.style';

export type NameInputsProps = {
  //
};
export const NameInputs: React.FC<NameInputsProps> = (props) => {
  const { t } = useTr();
  const [form] = Form.useForm();

  const rule = createSchemaFieldRule(nameInputsSchema(t));

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <S.NameInputContainer>
      <Form form={form} name={UPSTREAM_TAB_NAMES_FORM_ITEM.FORM_NAME} onFinish={onFinish}>
        <SearchItemsContainer style={{ '--grid-column-count': '2' } as React.CSSProperties}>
          <Form.Item name={UPSTREAM_TAB_NAMES_FORM_ITEM.ENGLISH_NAME} rules={[rule]}>
            <S.NameInputLabel>{t('english_name')}</S.NameInputLabel>
            <S.Input maxLength={MAX_LENGTH_INPUT} />
          </Form.Item>
          <Form.Item name={UPSTREAM_TAB_NAMES_FORM_ITEM.PERSIAN_NAME} rules={[rule]}>
            <S.NameInputLabel>{t('persian_name')}</S.NameInputLabel>
            <S.Input maxLength={MAX_LENGTH_INPUT} />
          </Form.Item>
        </SearchItemsContainer>
      </Form>
    </S.NameInputContainer>
  );
};
