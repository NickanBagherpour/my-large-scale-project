import React, { useState } from 'react';

import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useAuth } from '@oxygen/hooks';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { ApiUtil, ROUTES } from '@oxygen/utils';
import { Button, Input, Timer } from '@oxygen/ui-kit';

import { TIMER_INITIAL_SECONDS } from '../../utils/consts';

import { FORM_ITEM_NAMES } from '../../utils/form-items-name';
import { updateOTPAction, useAppDispatch, useAppState } from '../../context';
import { useVerifyLoginMutation, useVerifyRegisterMutation } from '../../services';

import { authFormSchema } from '../../types';

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
  const rule = createSchemaFieldRule(authFormSchema(t));

  //Handlers
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
      // await signIn('credentials', { ...user, redirect: false });
      await login(user, ROUTES.CUSTOMER.DASHBOARD);
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

  //Handle auto submit
  const handleOTPSubmit = () => {
    const fields = OTPForm.getFieldsValue();
    const otp = fields.otp?.length === 6;
    if (otp) {
      setTimeout(() => {
        //add setTimeout to allow form to submit(for resolve outOfDate error)
        OTPForm.submit();
      }, 0);
    }
  };

  //Render
  const renderFooter = () => {
    const isLogin = state.OTP.type === 'login';
    const loading = isLogin ? loginLoading : registerLoading;
    return (
      <>
        <S.Button loading={loading} onClick={handleSubmit} color='primary'>
          {isLogin ? t('enter') : t('submit')}
        </S.Button>
        <S.Button disabled={loading} onClick={handleReturn} color='primary' variant={'outlined'}>
          {t('button.return')}
        </S.Button>
      </>
    );
  };

  return (
    <S.FormContainer>
      <S.FormTitle>{t('get_one_time_code')}</S.FormTitle>

      <S.Box>
        <S.Paragraph>{t('enter_confirmation_code_sent_to', { phoneNumber })}</S.Paragraph>
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
            {<S.TimeParagraph>{t('resend_otp_code')}</S.TimeParagraph>}
          </Button>
        ) : (
          <>
            <S.TimeParagraph>{t('time_left')}</S.TimeParagraph>
            <Timer initialSeconds={TIMER_INITIAL_SECONDS} onComplete={handleTimer} />
          </>
        )}
      </S.TimerBox>
      {renderFooter()}
    </S.FormContainer>
  );
};

export default OTP;
