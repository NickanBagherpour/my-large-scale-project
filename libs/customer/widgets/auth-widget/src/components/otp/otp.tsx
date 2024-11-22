import React, { ReactNode, useState } from 'react';
import Link from 'next/link';

import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { Box, Button, Input, Timer } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';

import { updateOTPAction, useAppDispatch, useAppState } from '../../context';
import { FORM_ITEM_NAMES } from '../../utils/form-items-name';
import { RegisterFormSchema } from '../../types/sample.schema';
import { useGetCaptchaQuery } from '../../services/get-captcha.api';

import * as S from './otp.style';
import Image from 'next/image';
import { TIMER_INITIALSECONDS } from '../../utils/consts';

type FormContainerProps = PageProps & {
  //
};

export const OTP: React.FC<FormContainerProps> = () => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const [isTimerFinish, setIsTimerFinish] = useState(false);

  const phoneNumber = state.OTP.mobileNumber;

  const [OTPForm] = Form.useForm();

  const handleSubmit = () => OTPForm.submit();
  const handleReturn = () => {
    updateOTPAction(dispatch, { ...state.OTP, isOpen: false });
  };
  const handleFinish = (values: any) => {
    console.log(':)', values);
  };
  const handleTimer = () => {
    setIsTimerFinish(true);
  };
  const handleResend = () => {
    setIsTimerFinish(false);
  };

  return (
    <S.FormContainer>
      <S.FormTitle>{t('get_one_time_code')}</S.FormTitle>
      <S.Box>
        <S.Paragraph>{t('enter_confirmation_code_sent_to', { phoneNumber })}</S.Paragraph>
        <Button variant='link' onClick={handleReturn}>
          <S.BackParagraph>{t('change_mobile_number')}</S.BackParagraph>
        </Button>
      </S.Box>
      <Form layout={'vertical'} style={{ width: '100%' }} form={OTPForm} onFinish={handleFinish}>
        <S.FormInput>
          <Form.Item name={'OTP'}>
            <Input.OTP autoFocus />
          </Form.Item>
        </S.FormInput>
      </Form>
      <S.TimerBox>
        {isTimerFinish ? (
          <Button variant='link' onClick={handleResend}>
            {<S.BackParagraph>{t('resend_otp_code')}</S.BackParagraph>}
          </Button>
        ) : (
          <>
            <S.BackParagraph>{t('time_left')}</S.BackParagraph>
            <Timer initialSeconds={TIMER_INITIALSECONDS} onComplete={handleTimer} />
          </>
        )}
      </S.TimerBox>

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
