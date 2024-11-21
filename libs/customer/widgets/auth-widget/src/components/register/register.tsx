import React, { ReactNode } from 'react';
import Link from 'next/link';

import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { Button, Input } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';

import { useAppDispatch, useAppState } from '../../context';
import { FORM_ITEM_NAMES } from '../../utils/form-items-name';
import { RegisterFormSchema } from '../../types/sample.schema';

import * as S from './register.style';
import { useGetCaptchaQuery } from '../../services/get-captcha.api';

type FormContainerProps = PageProps & {
  title: string;
};

export const Register = ({ title }: FormContainerProps) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const { data } = useGetCaptchaQuery();
  console.log(data);

  const [modalForm] = Form.useForm();

  const rule = createSchemaFieldRule(RegisterFormSchema(t));

  const handleSubmit = () => modalForm.submit();

  const handleFinish = (values: any) => {
    console.log(':)', values);
  };

  return (
    <S.FormContainer>
      <S.FormBox>
        <S.FormTitle>{title}</S.FormTitle>
        <Form layout={'vertical'} style={{ width: '100%' }} form={modalForm} onFinish={handleFinish}>
          <S.FormInputs>
            <Form.Item name={FORM_ITEM_NAMES.national_code} rules={[rule]}>
              <Input placeholder={t('national_code')} allow={'number'} maxLength={11} />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.mobile_number} rules={[rule]}>
              <Input placeholder={t('mobile_number')} allow={'number'} maxLength={11} />
            </Form.Item>
          </S.FormInputs>
          <S.FormInputs>
            <Form.Item name={FORM_ITEM_NAMES.captcha_code} rules={[rule]}>
              <Input
                suffix={
                  <span style={{ display: 'flex' }}>
                    <img alt='capcha' />
                    <i
                      className='icon-search-normal'
                      onClick={() => console.log('allireza')}
                      style={{ cursor: 'pointer' }}
                    />
                  </span>
                }
                placeholder={t('captcha_code')}
              />
            </Form.Item>
          </S.FormInputs>
        </Form>
        <S.Button onClick={handleSubmit} color='primary'>
          {t('confirm_and_continue')}
        </S.Button>
        <S.Divider />
        <S.Span>
          {t('do_you_registered_already')}
          <Link href='/auth?authtype=login'>{t('login_to_portal')}</Link>
        </S.Span>
      </S.FormBox>
    </S.FormContainer>
  );
};

export default Register;
