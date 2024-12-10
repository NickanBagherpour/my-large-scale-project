import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { Button, Input, SearchItemsContainer } from '@oxygen/ui-kit';

import { nameInputsSchema } from 'libs/backoffice/widgets/service-details-widget/src/types';
import {
  MAX_LENGTH_INPUT,
  UPSTREAM_TAB_NAMES_FORM_ITEM,
} from 'libs/backoffice/widgets/service-details-widget/src/utils/consts';

import * as S from './name-inputs.style';
import {
  updateEnglishNameAction,
  updatepersianNameAction,
  useAppDispatch,
  useAppState,
} from 'libs/backoffice/widgets/service-details-widget/src/context';
import { useBounce } from '@oxygen/hooks';
import { useState } from 'react';

export type NameInputsProps = {
  //
};
export const NameInputs: React.FC<NameInputsProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const { t } = useTr();
  const [form] = Form.useForm();

  const [englishName, setEnglishName] = useState('');
  const [persianName, setPersianName] = useState('');
  const rule = createSchemaFieldRule(nameInputsSchema(t));

  useBounce(() => {
    updateEnglishNameAction(dispatch, englishName);
  }, [englishName]);

  useBounce(() => {
    updatepersianNameAction(dispatch, persianName);
  }, [persianName]);
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <S.NameInputContainer>
      <Form form={form} name={UPSTREAM_TAB_NAMES_FORM_ITEM.FORM_NAME} onFinish={onFinish}>
        <SearchItemsContainer style={{ '--grid-column-count': '2' } as React.CSSProperties}>
          <Form.Item name={UPSTREAM_TAB_NAMES_FORM_ITEM.ENGLISH_NAME} rules={[rule]}>
            <S.NameInputLabel>{t('english_name')}</S.NameInputLabel>
            <S.Input maxLength={MAX_LENGTH_INPUT} onChange={(e) => setEnglishName(e.target.value)} />
          </Form.Item>
          <Form.Item name={UPSTREAM_TAB_NAMES_FORM_ITEM.PERSIAN_NAME} rules={[rule]}>
            <S.NameInputLabel>{t('persian_name')}</S.NameInputLabel>
            <S.Input maxLength={MAX_LENGTH_INPUT} onChange={(e) => setPersianName(e.target.value)} />
          </Form.Item>
        </SearchItemsContainer>
      </Form>
    </S.NameInputContainer>
  );
};
