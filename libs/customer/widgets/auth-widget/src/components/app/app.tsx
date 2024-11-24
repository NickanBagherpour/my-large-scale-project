import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';

import Otp from '../otp/otp';
import Login from '../login/login';
import Register from '../register/register';
import { GlobalMessageContainer } from '@oxygen/reusable-components';
import { resetErrorMessageAction, updateOTPAction, useAppDispatch, useAppState } from '../../context';
import { Api } from '../../services';

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

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const data = await Api.getIP({});
        updateOTPAction(dispatch, { ip: data.ip });
        console.log('Fetched IP:', data);

      } catch (error) {
        console.error('Failed to fetch IP:', error);
      }
    };

    fetchIp();
  }, []);

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
      ) : authType === 'login' ? (
        <Login title={t('login_to_portal')} />
      ) : (
        <Register title={t('register_in_the_system')} />
      )}
    </>
  );
};

export default App;
