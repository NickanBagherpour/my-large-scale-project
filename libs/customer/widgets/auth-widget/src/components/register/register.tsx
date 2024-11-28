import React, { ReactNode, startTransition, useEffect, useState } from 'react';
import Link from 'next/link';

import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { ROUTES } from '@oxygen/utils';
import { Input } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';

import { useRegisterMutation } from '../../services';

import { INPUT_MAX_LENGTH, CAPTCHA_MAX_LENGTH } from '../../utils/consts';

import CaptchaInput from '../captcha-input/captcha-input';
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

  const { data, isLoading, isError, refetch, error } = useGetCaptchaQuery();
  const { mutate } = useRegisterMutation();
  const [registerForm] = Form.useForm();
  const [imageSrc, setImageSrc] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

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

  // console.log('----------------------------------->', imageSrc, data?.captchaToken , isLoading);
  // console.log('----------------------------------->', state);

  const refreshCaptcha = () => {
    refetch(); // Fetch a new captcha
  };

  const handleSubmit = () => registerForm.submit();

  // const handleFinish = (values: any) => {
  //   updateOTPAction(dispatch, { ...values, type: 'register', isOpen: true, captchaCode: undefined });
  // };

  const handleFinish = async (values: any) => {
    const params = {
      nationalCode: values.nationalCode,
      mobileNo: values.mobileNumber,
      captcha: values.captchaCode,
      captchaToken,
      registerIp: state.OTP.ip,
    };

    mutate(params, {
      onSuccess: (data) => {
        console.log('Registration successful:', data.headers['key'], data);

        const otpKey = data.headers['key'];
        updateOTPAction(dispatch, { ...values, type: 'register', isOpen: true, captchaCode: undefined, key: otpKey });
      },
      onError: (error) => {
        console.error('Registration failed:', error);
      },
    });
  };

  // Automatically move to next input field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, nextField: string | null) => {
    if (e.target.value.length === e.target.maxLength) {
      const nextInput = nextField ? document.getElementById(nextField) : null;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Auto-submit when all fields are filled
  const handleFieldChange = () => {
    const fields = registerForm.getFieldsValue();
    const allFieldsFilled = Object.values(fields).every((value) => value && value.toString().trim().length > 5);
    if (allFieldsFilled) {
      handleSubmit();
    }
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
        onValuesChange={handleFieldChange} // Trigger submit when all fields are filled
      >
        <S.FormInputs>
          <Form.Item name={FORM_ITEM_NAMES.national_code} rules={[rule]}>
            <Input
              placeholder={t('national_code')}
              allow={'number'}
              autoFocus
              maxLength={INPUT_MAX_LENGTH}
              onChange={(e) => handleInputChange(e, 'mobileNumber')}
            />
          </Form.Item>
          <Form.Item name={FORM_ITEM_NAMES.mobile_number} rules={[rule]}>
            <Input
              placeholder={t('mobile_number')}
              allow={'number'}
              maxLength={INPUT_MAX_LENGTH}
              onChange={(e) => handleInputChange(e, 'captcha_code')}
            />
          </Form.Item>
        </S.FormInputs>

        <S.Divider />

        <S.FormInput>
          <Form.Item name={FORM_ITEM_NAMES.captcha_code} rules={[rule]}>
            <CaptchaInput
              id='captcha_code'
              captchaMaxLength={CAPTCHA_MAX_LENGTH}
              imageSrc={imageSrc}
              onRefresh={refreshCaptcha}
              name='captcha_code'
              placeholder={t('captcha_code')}
              loading={isLoading}
              onChange={(e) => handleInputChange(e, null)} // No next field, so just move on to submit
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
        <Link href={`${ROUTES.CUSTOMER.AUTH}?type=login`}>{t('login_to_portal')}</Link>
      </S.Span>
    </S.FormContainer>
  );
};

export default Register;
