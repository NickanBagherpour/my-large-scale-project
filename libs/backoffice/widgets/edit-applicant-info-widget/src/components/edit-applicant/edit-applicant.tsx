import { createSchemaFieldRule } from 'antd-zod';
import React from 'react';
import { Form } from 'antd';

import { useTr } from '@oxygen/translation';
import { Button, Input, SearchItemsContainer } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { FooterContainer, ReturnButton } from '@oxygen/reusable-components';

import { useAppDispatch, useAppState } from '../../context';

import { MOBILE_NUMBER_LIMIT, NATIONAL_CODE_LIMIT, TEXT_INPUT_LIMIT } from '../../utils/consts';
import { FORM_ITEM_NAMES } from '../../utils/form-item-name';
import { FormSchema } from '../../types/settings.schema';

import * as S from './edit-applicant.style';
import { useRouter } from 'next/navigation';

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

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };

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
              <Input placeholder={t('placeholder.userName')} allow={'letter'} maxLength={TEXT_INPUT_LIMIT} />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.nationalCode} label={t('form.nationalCode')} rules={[rule]}>
              <Input placeholder={t('placeholder.nationalCode')} allow={'number'} maxLength={NATIONAL_CODE_LIMIT} />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.organizationName} rules={[rule]} label={t('form.organizationName')}>
              <Input placeholder={t('placeholder.organizationName')} allow={'letter'} maxLength={TEXT_INPUT_LIMIT} />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.mobileNumber} rules={[rule]} label={t('form.mobileNumber')}>
              <Input
                placeholder={t('placeholder.mobileNumber')}
                allow={'number'}
                type='tel'
                maxLength={MOBILE_NUMBER_LIMIT}
              />
            </Form.Item>
            <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.telePhone} label={t('form.telPhone')}>
              <Input
                placeholder={t('placeholder.telPhone')}
                allow={'number'}
                type='tel'
                maxLength={MOBILE_NUMBER_LIMIT}
              />
            </Form.Item>
            <Form.Item rules={[rule]} name={FORM_ITEM_NAMES.email} label={t('form.email')}>
              <Input placeholder={t('placeholder.email')} maxLength={TEXT_INPUT_LIMIT} />
            </Form.Item>
          </SearchItemsContainer>
        </Form>
      </div>
      <FooterContainer>
        <ReturnButton size={'large'} variant={'outlined'} onClick={handleReturn}>
          {t('form.cancel')}
        </ReturnButton>
        <Button htmlType={'submit'} onClick={submitClick}>
          {t('form.save_changes')}
        </Button>
      </FooterContainer>
    </S.EditApplicantContainer>
  );
};

export default EditApplicant;
