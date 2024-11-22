import React from 'react';
import { useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import Login from '../login/login';
import Register from '../register/register';
import { useAppDispatch, useAppState } from '../../context';
import Otp from '../otp/otp';

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

  return (
    <>
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
