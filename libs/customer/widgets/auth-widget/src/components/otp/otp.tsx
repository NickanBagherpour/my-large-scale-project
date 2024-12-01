import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useAuth } from '@oxygen/hooks';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { ApiUtil, ROUTES } from '@oxygen/utils';
import { Box, Button, Input, Timer } from '@oxygen/ui-kit';

import { TIMER_INITIAL_SECONDS } from '../../utils/consts';

import { FORM_ITEM_NAMES } from '../../utils/form-items-name';
import { updateOTPAction, useAppDispatch, useAppState } from '../../context';
import { useVerifyRegisterMutation, useVerifyLoginMutation } from '../../services';

import { RegisterFormSchema } from '../../types';

import * as S from './otp.style';

type FormContainerProps = PageProps & {
  //
};

export const OTP: React.FC<FormContainerProps> = () => {
  //Hooks
  const dispatch = useAppDispatch();
  const { login } = useAuth();
  const state = useAppState();
  const [t] = useTr();

  //Queries
  const { mutateAsync: mutateAsyncVerifyLogin, isPending: loginLoading } = useVerifyLoginMutation();
  const { mutateAsync: mutateAsyncVerifyRegister, isPending: registerLoading } = useVerifyRegisterMutation();

  //Form
  const [OTPForm] = Form.useForm();

  //State & const
  const [isTimerFinish, setIsTimerFinish] = useState(false);
  const phoneNumber = state.OTP.mobileNumber;

  //Validation
  const rule = createSchemaFieldRule(RegisterFormSchema(t));

  const handleSubmit = () => {
    OTPForm.submit();
  };

  const handleReturn = () => {
    updateOTPAction(dispatch, { ...state.OTP, isOpen: false });
  };

  const handleFinish = async (values: any) => {
    const params = {
      otpKey: state.OTP.key,
      otpValue: values.otp,
    };
    try {
      let data: any = null;
      if (state.OTP.type === 'register') {
        data = await mutateAsyncVerifyRegister(params);
      } else {
        data = await mutateAsyncVerifyLogin(params);
      }
      if (!data) return;
      const user = { name: state.OTP.mobileNumber, id: data?.headers['authorization'] };
      await login(user, ROUTES.CUSTOMER.PROFILE);
    } catch (e) {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    }
  };

  const handleTimer = () => {
    setIsTimerFinish(true);
  };

  const handleResend = () => {
    setIsTimerFinish(false);
  };

  const handleOTPSubmit = () => {
    setTimeout(() => {
      OTPForm.submit();
    }, 0);
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
      <Form
        layout={'vertical'}
        style={{ width: '100%' }}
        form={OTPForm}
        onFinish={handleFinish}
        onValuesChange={handleOTPSubmit}
      >
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
            <Timer initialSeconds={TIMER_INITIAL_SECONDS} onComplete={handleTimer} />
          </>
        )}
      </S.TimerBox>

      {state.OTP.type === 'login' ? (
        <>
          <S.Button loading={loginLoading} onClick={handleSubmit} color='primary'>
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
          <S.Button loading={registerLoading} onClick={handleSubmit} color='primary'>
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
