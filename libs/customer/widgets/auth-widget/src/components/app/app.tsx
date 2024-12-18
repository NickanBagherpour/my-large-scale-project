import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { GlobalMessageContainer } from '@oxygen/reusable-components';

import Otp from '../otp/otp';
import Login from '../login/login';
import Register from '../register/register';
import { useGetIpQuery } from '../../services/ip.api';
import { resetErrorMessageAction, updateOTPAction, useAppDispatch, useAppState } from '../../context';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const searchParams = useSearchParams();
  const authType = searchParams.get('type');

  const isOTPOpen = state.OTP.isOpen;

  const { data, isFetching, isError, error } = useGetIpQuery({});

  useEffect(() => {
    updateOTPAction(dispatch, { ...state.OTP, ip: data?.ip });
  }, [data]);

  return (
    <>
      <GlobalMessageContainer
        message={state.message}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      {isOTPOpen ? (
        <Otp />
      ) : authType === 'register' ? (
        <Register title={t('register_in_the_system')} />
      ) : (
        <Login title={t('login_to_portal')} />
      )}
    </>
  );
};

export default App;
