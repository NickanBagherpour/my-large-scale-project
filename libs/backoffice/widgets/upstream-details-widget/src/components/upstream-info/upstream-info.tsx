import React, { useEffect, useState } from 'react';
import { createSchemaFieldRule } from 'antd-zod';
import { Form } from 'antd';
import { useTr } from '@oxygen/translation';
import * as S from './upstream-info.sytle';
import { updateSearchTerm, useAppDispatch, useAppState } from '../../context';
import { Button, Input } from '@oxygen/ui-kit';
import { FORM_ITEM_NAMES } from '../../utils/form-items-name';
import { useBounce } from '@oxygen/hooks';
import { PageProps } from '@oxygen/types';
import { FormSchema } from '../../types/setting.schema';

// export default function UpstreamInfo() {
type UpstreamInfoProps = PageProps & {
  name?: string;
  persianName?: string;
  addServer: () => void;
  triggerRegisterAction: boolean;
  toggleLoading: () => void;
  resetTriggerRegisterAction: () => void;
};
const UpstreamInfo: React.FC<UpstreamInfoProps> = (props) => {
  const { name, persianName, addServer, triggerRegisterAction, toggleLoading, resetTriggerRegisterAction } = props;
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');
  const [form] = Form.useForm();

  const defaultValues = {
    [FORM_ITEM_NAMES.name]: name,
    [FORM_ITEM_NAMES.persianName]: persianName,
  };

  useEffect(() => {
    form.setFieldsValue({
      [FORM_ITEM_NAMES.name]: name,
      [FORM_ITEM_NAMES.persianName]: persianName,
    });
  }, [name, persianName, form]);

  useEffect(() => {
    if (triggerRegisterAction) {
      submitForm();
    }
  }, [triggerRegisterAction]);

  const rule = createSchemaFieldRule(FormSchema(t));

  useBounce(() => {
    updateSearchTerm(dispatch, value);
  }, [value]);

  const submitForm = () => {
    form.submit();
  };

  const onFinish = (values) => {
    toggleLoading();
    setTimeout(() => {
      toggleLoading();
      resetTriggerRegisterAction();
    }, 2000);
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
        <Button color={'secondary'} onClick={() => addServer()}>
          <i className={'icon-plus'}></i>
          {t('add_server')}
        </Button>
      </S.Actions>
    </S.UpstreamInfoContainer>
  );
};

export default UpstreamInfo;
