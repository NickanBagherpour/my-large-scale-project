import React, { ReactNode } from 'react';
import Link from 'next/link';

import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { Box, Button, Input } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';

import { useAppDispatch, useAppState } from '../../context';
import { FORM_ITEM_NAMES } from '../../utils/form-items-name';
import { RegisterFormSchema } from '../../types/sample.schema';
import { useGetCaptchaQuery } from '../../services/get-captcha.api';

import * as S from './otp.style';
import Image from 'next/image';

type FormContainerProps = PageProps & {
  //
};

export const OTP: React.FC<FormContainerProps> = () => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const phoneNumber = state.OTP.mobileNumber;

  //to do : call captcha
  const { data, isFetching } = useGetCaptchaQuery();

  const [registerForm] = Form.useForm();

  const rule = createSchemaFieldRule(RegisterFormSchema(t));

  const handleSubmit = () => registerForm.submit();

  const handleFinish = (values: any) => {
    console.log(':)', values);
  };

  return (
    <S.FormContainer>
      <Box>
        <S.FormTitle>{t('get_one_time_code')}</S.FormTitle>
      </Box>
      <S.Paragraph>{t('enter_confirmation_code_sent_to', { phoneNumber })}</S.Paragraph>
      <Form layout={'vertical'} style={{ width: '100%' }} form={registerForm} onFinish={handleFinish}>
        <S.FormInputs>
          <Input.OTP />
        </S.FormInputs>
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

export default OTP;
