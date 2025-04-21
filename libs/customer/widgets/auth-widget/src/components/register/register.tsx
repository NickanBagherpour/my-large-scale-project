import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { ROUTES } from '@oxygen/utils';
import { Input } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';

import { useRegisterMutation } from '../../services';

import { CAPTCHA_MAX_LENGTH, MOBILENUMBER_MAX_LENGTH, NATIONALCODE_MAX_LENGTH } from '../../utils/consts';

import CaptchaInput from '../captcha-input/captcha-input';
import { REGISTER_ITEM_NAMES } from '../../utils/form-items-name';
import { authFormSchema } from '../../types/sample.schema';
import { useGetCaptchaQuery } from '../../services/get-captcha.api';
import { updateOTPAction, useAppDispatch, useAppState } from '../../context';

import * as S from './register.style';

type FormContainerProps = PageProps & {
  title: string;
};

export const Register = ({ title }: FormContainerProps) => {
  //Hooks
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  //Queries
  const { data, isLoading, refetch } = useGetCaptchaQuery();
  const { mutate, isPending, isError } = useRegisterMutation();

  //Form
  const [registerForm] = Form.useForm();

  //States
  const [imageSrc, setImageSrc] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

  //Validation
  const rule = createSchemaFieldRule(authFormSchema(t));

  useEffect(() => {
    if (data?.captchaImage) {
      // Create a local URL for the Blob data
      const url = URL.createObjectURL(data?.captchaImage);
      setImageSrc(url);
      setCaptchaToken(data.captchaToken);

      // Clean up the URL object when the component unmounts or when data changes
      return () => URL.revokeObjectURL(url);
    }
  }, [data]);

  const refreshCaptcha = () => {
    refetch(); // Fetch a new captcha
    registerForm.setFieldsValue({ [REGISTER_ITEM_NAMES.captcha_code]: '' }); // Clear the captcha input
  };

  const handleSubmit = () => {
    registerForm.submit();
  };

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
        // console.log('Registration successful:', data.headers['key'], data);
        const otpKey = data.headers['key'];
        updateOTPAction(dispatch, { ...values, type: 'register', isOpen: true, captchaCode: undefined, key: otpKey });
      },
      onError: (error) => {
        refreshCaptcha();
      },
    });
  };

  // // Automatically move to next input field
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, nextField: string | null) => {
  //   if (e.target.value.length === e.target.maxLength) {
  //     const nextInput = nextField ? document.getElementById(nextField) : null;
  //     if (nextInput) {
  //       nextInput.focus();
  //     }
  //   }
  // };

  // Auto-submit when all fields are filled
  // const handleFieldChange = () => {
  // const fields = registerForm.getFieldsValue();
  // const mobileNumber = fields.mobileNumber?.length === MOBILENUMBER_MAX_LENGTH;
  // const natonalCode = fields.nationalCode?.length === NATIONALCODE_MAX_LENGTH;
  // const captchaCode = fields.captchaCode?.length === CAPTCHA_MAX_LENGTH;
  // console.log('mobileNumber', mobileNumber, 'natonalCode', natonalCode, 'captchaCode', captchaCode);
  // // Ensure all required fields are filled before submitting
  // if (mobileNumber && natonalCode && captchaCode) {
  //   setTimeout(() => {
  //     registerForm.submit(); // Proceed with submit after validation
  //   }, 0);
  // }
  // };

  return (
    <S.FormContainer>
      <S.FormTitle>{title}</S.FormTitle>

      <Form
        layout={'vertical'}
        style={{ width: '100%' }}
        form={registerForm}
        initialValues={state.OTP}
        onFinish={handleFinish}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            registerForm.submit();
          }
        }}
      >
        <S.FormInputs>
          <Form.Item name={REGISTER_ITEM_NAMES.national_code} rules={[rule]}>
            <Input placeholder={t('national_code')} allow={'number'} autoFocus maxLength={NATIONALCODE_MAX_LENGTH} />
          </Form.Item>
          <Form.Item name={REGISTER_ITEM_NAMES.mobile_number} rules={[rule]}>
            <Input placeholder={t('mobile_number')} allow={'number'} maxLength={MOBILENUMBER_MAX_LENGTH} />
          </Form.Item>
        </S.FormInputs>

        <S.Divider />

        <S.FormInput>
          <Form.Item name={REGISTER_ITEM_NAMES.captcha_code} rules={[rule]}>
            {imageSrc && (
              <CaptchaInput
                id='captcha_code'
                captchaMaxLength={CAPTCHA_MAX_LENGTH}
                imageSrc={imageSrc}
                onRefresh={refreshCaptcha}
                name='captcha_code'
                placeholder={t('captcha_code')}
                loading={isLoading}
              />
            )}
          </Form.Item>
        </S.FormInput>
      </Form>
      <S.Button loading={isPending} onClick={handleSubmit} color='primary'>
        {t('confirm_and_continue')}
      </S.Button>
      <S.Button disabled={isPending} href={'/'} color='primary' variant={'outlined'}>
        {t('home_return')}
      </S.Button>
      <S.Divider />
      <S.Span>
        {t('do_you_registered_already')}
        <Link href={`${ROUTES.CUSTOMER.AUTH}`}>{t('login_to_portal')}</Link>
      </S.Span>
    </S.FormContainer>
  );
};

export default Register;
