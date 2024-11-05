import React, { useEffect, useState } from 'react';
import { createSchemaFieldRule } from 'antd-zod';
import { Form } from 'antd';
import { useTr } from '@oxygen/translation';
import * as S from './upstream-info.sytle';
import { updateSearchTerm, updateSort, updateStatus, useAppDispatch, useAppState } from '../../context';
import { Button, Input, SearchItemsContainer } from '@oxygen/ui-kit';
import { FORM_ITEM_NAMES } from '../../utils/form-items-name';
import { useBounce } from '@oxygen/hooks';
import { PageProps } from '@oxygen/types';
import { FormSchema } from '../../types/setting.schema';

// export default function UpstreamInfo() {
type UpstreamInfoProps = PageProps & {
  //
  // userData: any;
};
const UpstreamInfo: React.FC<UpstreamInfoProps> = (props) => {
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const { status, sort } = useAppState();
  const [value, setValue] = useState('');
  const [form] = Form.useForm();

  const defaultValues = {
    [FORM_ITEM_NAMES.name]: 'mohsen',
    [FORM_ITEM_NAMES.persianName]: 'جعفری',
  };

  const rule = createSchemaFieldRule(FormSchema(t));

  useBounce(() => {
    updateSearchTerm(dispatch, value);
  }, [value]);

  const onFinish = async (values) => {
    console.log('asdfadsf', values);
  };

  return (
    <S.UpstreamInfoContainer>
      <Form layout={'vertical'} style={{ width: '100%' }} onFinish={onFinish} form={form} initialValues={defaultValues}>
        <S.InfoItemsContainer>
          <Form.Item name={FORM_ITEM_NAMES.name} label={t('form.name')} rules={[rule]}>
            <Input />
          </Form.Item>
          <Form.Item name={FORM_ITEM_NAMES.persianName} label={t('form.persianName')} rules={[rule]}>
            <Input />
          </Form.Item>
        </S.InfoItemsContainer>
      </Form>
      <S.Actions>
        <S.UpstreamServerTitle>{t('upstream_server_title')}</S.UpstreamServerTitle>
        <Button color={'secondary'} onClick={() => form.submit()}>
          <i className={'icon-plus'}></i>
          {t('add_server')}
        </Button>
      </S.Actions>
    </S.UpstreamInfoContainer>
  );
};

export default UpstreamInfo;
