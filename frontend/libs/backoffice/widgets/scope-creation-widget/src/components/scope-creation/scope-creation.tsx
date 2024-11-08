import React from 'react';
import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, Input, SearchItemsContainer } from '@oxygen/ui-kit';

import { useAppDispatch, useAppState } from '../../context';

import { FORM_ITEM_NAMES } from '../../utils/form-item-name';
import { FormSchema } from '../../types';
import { SCOPE_MANAGEMENT_URL } from '../../utils/consts';
import { MAX_LENGTH_INPUT } from '../../../../scope-management-widget/src/utils/consts';

import * as S from './scope-creation.style';

type EditScopeProps = PageProps & {
  //
};

const ScopeCreation: React.FC<EditScopeProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const [form] = Form.useForm();

  const rule = createSchemaFieldRule(FormSchema(t));

  const submitClick = () => form.submit();

  const onFinish = async (values) => {
    // console.log('formValue', values);
  };

  return (
    <S.ScopeCreationContainer>
      <div className={'form-wrapper'}>
        <Form layout={'vertical'} onFinish={onFinish} form={form}>
          <SearchItemsContainer>
            <Form.Item
              name={FORM_ITEM_NAMES.latinNameScope}
              className={'span-2'}
              label={t('form.latin_name_scope')}
              rules={[rule]}
            >
              <Input maxLength={MAX_LENGTH_INPUT} />
            </Form.Item>
            <Form.Item
              name={FORM_ITEM_NAMES.persianNameScope}
              className={'span-2'}
              label={t('form.persian_name_scope')}
              rules={[rule]}
            >
              <Input maxLength={MAX_LENGTH_INPUT} />
            </Form.Item>
          </SearchItemsContainer>
        </Form>
      </div>
      <div className={'footer'}>
        <Button href={SCOPE_MANAGEMENT_URL} variant={'outlined'}>
          {t('buttons.cancel')}
        </Button>
        <Button htmlType={'submit'} onClick={submitClick}>
          {t('buttons.register_scope')}
        </Button>
      </div>
    </S.ScopeCreationContainer>
  );
};

export default ScopeCreation;
