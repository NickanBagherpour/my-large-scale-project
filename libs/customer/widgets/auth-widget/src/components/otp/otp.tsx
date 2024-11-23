import React, { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { Box, Button, Input, Timer } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { ROUTES } from '@oxygen/utils';

import { TIMER_INITIALSECONDS } from '../../utils/consts';

import { FORM_ITEM_NAMES } from '../../utils/form-items-name';
import { RegisterFormSchema } from '../../types/sample.schema';
import { updateOTPAction, useAppDispatch, useAppState } from '../../context';

import * as S from './otp.style';

type FormContainerProps = PageProps & {
  //
};

export const OTP: React.FC<FormContainerProps> = () => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const router = useRouter();
  const [OTPForm] = Form.useForm();

  const [isTimerFinish, setIsTimerFinish] = useState(false);

  const phoneNumber = state.OTP.mobileNumber;

  const rule = createSchemaFieldRule(RegisterFormSchema(t));

  const handleLoginSubmit = () => {
    OTPForm.submit();
  };
  const handleRegisterSubmit = () => {
    OTPForm.submit();
  };
  const handleReturn = () => {
    updateOTPAction(dispatch, { ...state.OTP, isOpen: false });
  };

  const handleFinish = (values: any) => {
    console.log(':)', values);
    router.push('/');
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
          <Form.Item name={FORM_ITEM_NAMES.otp} rules={[rule]}>
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

      {state.OTP.type === 'login' ? (
        <>
          <S.Button onClick={handleRegisterSubmit} color='primary'>
            {t('submit')}
          </S.Button>
          <S.Divider />
          <S.Span>
            {t('dont_have_account')}
            <Link href={`${ROUTES.CUSTOMER.AUTH}`}> {t('register_in_the_system')}</Link>
          </S.Span>
        </>
      ) : (
        <>
          <S.Button onClick={handleLoginSubmit} color='primary'>
            {t('submit')}
          </S.Button>
          <S.Divider />
          <S.Span>
            {t('do_you_registered_already')}
            <Link href={`${ROUTES.CUSTOMER.AUTH}`}>{t('login_to_portal')}</Link>
          </S.Span>
        </>
      )}
    </S.FormContainer>
  );
};

export default OTP;
