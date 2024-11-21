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
      <S.FormTitle>{t('get_one_time_code')}</S.FormTitle>

      <Form layout={'vertical'} style={{ width: '100%' }} form={registerForm} onFinish={handleFinish}>
        <S.FormInputs></S.FormInputs>

        <S.Divider />

        <S.FormInput>
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

export default OTP;
