import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { Button, Input } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';

import { INPUT_MAX_LENGTH } from '../../utils/consts';
import { FORM_ITEM_NAMES } from '../../utils/form-items-name';
import { RegisterFormSchema } from '../../types/sample.schema';
import { useGetCaptchaQuery } from '../../services/get-captcha.api';
import { updateOTPAction, useAppDispatch, useAppState } from '../../context';

import * as S from './register.style';

type FormContainerProps = PageProps & {
  title: string;
};

export const Register = ({ title }: FormContainerProps) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  //to do : call captcha
  const { data, isFetching } = useGetCaptchaQuery();

  const [registerForm] = Form.useForm();

  const rule = createSchemaFieldRule(RegisterFormSchema(t));

  const handleSubmit = () => registerForm.submit();

  const handleFinish = (values: any) => {
    updateOTPAction(dispatch, { ...values, type: 'register', isOpen: true, captchaCode: undefined });
  };

  return (
    <S.FormContainer>
      <S.FormTitle>{title}</S.FormTitle>

      <Form
        layout={'vertical'}
        style={{ width: '100%' }}
        form={registerForm}
        initialValues={state.OTP}
        onFinish={handleFinish}
      >
        <S.FormInputs>
          <Form.Item name={FORM_ITEM_NAMES.national_code} rules={[rule]}>
            <Input placeholder={t('national_code')} allow={'number'} maxLength={INPUT_MAX_LENGTH} />
          </Form.Item>
          <Form.Item name={FORM_ITEM_NAMES.mobile_number} rules={[rule]}>
            <Input placeholder={t('mobile_number')} allow={'number'} maxLength={INPUT_MAX_LENGTH} size='large' />
          </Form.Item>
        </S.FormInputs>

        <S.Divider />

        <S.FormInput>
          <Form.Item name={FORM_ITEM_NAMES.captcha_code} rules={[rule]}>
            <Input
              maxLength={INPUT_MAX_LENGTH}
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
        </S.FormInput>
      </Form>
      <S.Button onClick={handleSubmit} color='primary'>
        {t('confirm_and_continue')}
      </S.Button>
      <S.Divider />
      <S.Span>
        {t('do_you_registered_already')}
        <Link href='/auth?type=login'>{t('login_to_portal')}</Link>
      </S.Span>
    </S.FormContainer>
  );
};

export default Register;
