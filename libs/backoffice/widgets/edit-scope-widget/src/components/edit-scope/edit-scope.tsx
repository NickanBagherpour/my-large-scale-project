import React from 'react';
import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, Input, SearchItemsContainer } from '@oxygen/ui-kit';
import { FooterContainer } from '@oxygen/reusable-components';
import { ROUTES } from '@oxygen/utils';

import { useAppDispatch, useAppState } from '../../context';
import { FormSchema } from '../../types';
import { FORM_ITEM_NAMES } from '../../utils/form-item-name';
import { MAX_LENGTH_INPUT } from '../../utils/consts';

import * as S from './edit-scope.style';

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
    // console.log('inputValue', values);
  };

  return (
    <S.EditScopeContainer>
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
      <FooterContainer>
        <Button href={ROUTES.BACKOFFICE.SCOPE_LIST} variant={'outlined'}>
          {t('buttons.cancel')}
        </Button>
        <Button htmlType={'submit'} onClick={submitClick}>
          {t('buttons.register_scope')}
        </Button>
      </FooterContainer>
    </S.EditScopeContainer>
  );
};

export default EditScope;
