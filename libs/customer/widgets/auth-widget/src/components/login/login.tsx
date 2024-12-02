import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';

import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { Button, Input } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { ROUTES } from '@oxygen/utils';

import CaptchaInput from '../captcha-input/captcha-input';
import { FORM_ITEM_NAMES } from '../../utils/form-items-name';
import { RegisterFormSchema } from '../../types';
import { useGetCaptchaQuery } from '../../services/get-captcha.api';
import { updateOTPAction, useAppDispatch, useAppState } from '../../context';

import { CAPTCHA_MAX_LENGTH, INPUT_MAX_LENGTH } from '../../utils/consts';

import * as S from './login.style';
import { useLoginMutation } from '../../services';

type FormContainerProps = PageProps & {
  title: string;
};

export const Login = ({ title }: FormContainerProps) => {
  //Hooks
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  //Queries
  const { data, isLoading, isError, refetch } = useGetCaptchaQuery();
  const { mutate, isPending } = useLoginMutation();

  //States
  const [loginForm] = Form.useForm();
  const [imageSrc, setImageSrc] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

  //Validation
  const rule = createSchemaFieldRule(RegisterFormSchema(t));

  useEffect(() => {
    if (data?.captchaImage) {
      // Create a local URL for the Blob data
      const url = URL.createObjectURL(data?.captchaImage);
      setImageSrc(url);
      setCaptchaToken(data.captchaToken);
      // Clean up the URL object when the component unmounts or when data changes
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [data]);

  const refreshCaptcha = () => {
    refetch();
  };

  const handleSubmit = () => loginForm.submit();

  const handleFinish = async (values: any) => {
    const params = {
      username: values.mobileNumber,
      captcha: values.captchaCode,
      captchaToken,
      userIp: state.OTP.ip,
    };

    mutate(params, {
      onSuccess: (data) => {
        console.log('Login successful:', data.headers['key'], data);

        const otpKey = data.headers['key'];
        updateOTPAction(dispatch, { ...values, type: 'login', isOpen: true, captchaCode: undefined, key: otpKey });
      },
      onError: (error) => {
        console.error('Login failed:', error);
      },
    });
  };

  return (
    <S.FormContainer>
      <S.FormTitle>{title}</S.FormTitle>

      <Form
        layout={'vertical'}
        style={{ width: '100%' }}
        form={loginForm}
        initialValues={state.OTP}
        onFinish={handleFinish}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            loginForm.submit();
          }
        }}
      >
        <S.FormInputs>
          <Form.Item name={FORM_ITEM_NAMES.mobile_number} rules={[rule]}>
            <Input placeholder={t('mobile_number')} allow={'number'} maxLength={INPUT_MAX_LENGTH} size='large' />
          </Form.Item>
        </S.FormInputs>

        <S.Divider />

        <S.FormInput>
          <Form.Item name={FORM_ITEM_NAMES.captcha_code} rules={[rule]}>
            <CaptchaInput
              captchaMaxLength={CAPTCHA_MAX_LENGTH}
              imageSrc={imageSrc}
              onRefresh={refreshCaptcha}
              // name='captcha_code'
              placeholder={t('captcha_code')}
              loading={isLoading}
            />
          </Form.Item>
        </S.FormInput>
      </Form>
      <S.Button loading={isPending} onClick={handleSubmit} color='primary'>
        {t('confirm_and_continue')}
      </S.Button>
      <S.Divider />
      <S.Span>
        {t('dont_have_account')}
        <Link href={`${ROUTES.CUSTOMER.AUTH}`}>{t('register_in_the_system')}</Link>
      </S.Span>
    </S.FormContainer>
  );
};

export default Login;
