import { createSchemaFieldRule } from 'antd-zod';
import React from 'react';
import { Form } from 'antd';

import { useTr } from '@oxygen/translation';
import { Button, Input, SearchItemsContainer } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { FooterContainer } from '@oxygen/reusable-components';

import { useAppDispatch, useAppState } from '../../context';

import { FORM_ITEM_NAMES } from '../../utils/form-item-name';
import { FormSchema } from '../../types/settings.schema';

import * as S from './edit-applicant.style';

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

  const rule = createSchemaFieldRule(FormSchema(t));

  const submitClick = () => form.submit();

  const onFinish = async (values) => {
    // console.log(values);
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
    <S.EditApplicantContainer>
      <div className={'form-wrapper'}>
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
            <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.telePhone} label={t('form.telPhone')}>
              <Input placeholder={t('placeholder.telPhone')} />
            </Form.Item>
            <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.email} label={t('form.email')}>
              <Input placeholder={t('placeholder.email')} />
            </Form.Item>
          </SearchItemsContainer>
        </Form>
      </div>
      <FooterContainer>
        <Button variant={'outlined'} href={'/client-details'}>
          {t('form.cancel')}
        </Button>
        <Button htmlType={'submit'} onClick={submitClick}>
          {t('form.save_changes')}
        </Button>
      </FooterContainer>
    </S.EditApplicantContainer>
  );
};

export default EditApplicant;
