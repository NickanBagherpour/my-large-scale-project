'useClient';
import React, { useEffect, useState } from 'react';
import { Form } from 'antd';

import { useTr } from '@oxygen/translation';
import { Button, Chip, Dropdown, Input, SearchItemsContainer, Select, Switch } from '@oxygen/ui-kit';
import { Nullable, PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';

import { FORM_ITEM_NAMES } from '../../utils/form-item-name';

import * as S from './edit-applicant.style';
import { rule } from '../../types/settings.schema';

type FirstStepProps = PageProps & {
  //
  userData: any;
};

const EditApplicant: React.FC<FirstStepProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const [form] = Form.useForm();
  const { userData } = props;

  const submitClick = () => form.submit();

  const onFinish = async (values) => {
    console.log('asdfadsf', values);
  };

  const defaultValues = {
    [FORM_ITEM_NAMES.userName]: userData.userName,
    [FORM_ITEM_NAMES.nationalCode]: userData.nationalCode,
    [FORM_ITEM_NAMES.organizationName]: userData.organizationName,
    [FORM_ITEM_NAMES.mobileNumber]: userData.phoneNumber,
    [FORM_ITEM_NAMES.telePhone]: userData.tele,
    [FORM_ITEM_NAMES.email]: userData.email,
  };

  return (
    <S.FirtStepContainer>
      <div className={'form_wrapper'}>
        <p className={'cards-title'}>{t('edit_applicant_info')}</p>
        <Form layout={'vertical'} onFinish={onFinish} form={form} initialValues={defaultValues}>
          <SearchItemsContainer>
            <Form.Item name={FORM_ITEM_NAMES.userName} label={t('form.userName')} rules={[rule]}>
              <Input placeholder={t('placeholder.userName')} />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.nationalCode} label={t('form.nationalCode')} rules={[rule]}>
              <Input placeholder={t('placeholder.nationalCode')} />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.organizationName} rules={[rule]} label={t('form.organizationName')}>
              <Input placeholder={t('placeholder.organizationName')} />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.mobileNumber} rules={[rule]} label={t('form.mobileNumber')}>
              <Input placeholder={t('placeholder.mobileNumber')} />
            </Form.Item>
            <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.telePhone} label={t('form.telePhone')}>
              <Input placeholder={t('placeholder.telePhone')} />
            </Form.Item>
            <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.email} label={t('form.email')}>
              <Input placeholder={t('placeholder.email')} />
            </Form.Item>
          </SearchItemsContainer>
        </Form>
      </div>
      <div className={'footer'}>
        <Button variant={'outlined'}>{t('form.return')}</Button>
        <Button htmlType={'submit'} onClick={submitClick}>
          {t('form.register_info')}
          <i className={'icon-arrow-left'}></i>
        </Button>
      </div>
    </S.FirtStepContainer>
  );
};

export default EditApplicant;
