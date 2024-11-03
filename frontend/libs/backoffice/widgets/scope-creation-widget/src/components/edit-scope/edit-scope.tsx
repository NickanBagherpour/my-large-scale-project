import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';
//import { useGetReportDataQuery } from '../../services';
import * as S from './edit-scope.style';
import { Form } from 'antd';
import { Button, Input, SearchItemsContainer } from '@oxygen/ui-kit';
import { createSchemaFieldRule } from 'antd-zod';
import { FORM_ITEM_NAMES } from '../../utils/form-item-name';
import { FormSchema } from '../../types';

type EditScopeProps = PageProps & {
  //
};

const EditScope: React.FC<EditScopeProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const [form] = Form.useForm();

  const rule = createSchemaFieldRule(FormSchema(t));

  const submitClick = () => form.submit();

  const onFinish = async (values) => {
    console.log('asdfadsf', values);
  };

  return (
    <S.EditScopeContainer>
      <div className={'form_wrapper'}>
        <Form layout={'vertical'} onFinish={onFinish} form={form}>
          <SearchItemsContainer>
            <Form.Item
              name={FORM_ITEM_NAMES.latinNameScope}
              className={'span-2'}
              label={t('form.latin_name_scope')}
              rules={[rule]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={FORM_ITEM_NAMES.persianNameScope}
              className={'span-2'}
              label={t('form.persian_name_scope')}
              rules={[rule]}
            >
              <Input />
            </Form.Item>
          </SearchItemsContainer>
        </Form>
      </div>
      <div className={'footer'}>
        <Button variant={'outlined'}>{t('buttons.cancel')}</Button>
        <Button htmlType={'submit'} onClick={submitClick}>
          {t('buttons.register_scope')}
        </Button>
      </div>
    </S.EditScopeContainer>
  );
};

export default EditScope;
