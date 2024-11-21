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
  const authType = searchParams.get('authtype');

  const isOtp = state;

  return <>{isOtp ? <Otp /> : authType === 'login' ? <Login /> : <Register title={'ثبت نام در سامانه'} />}</>;
};

export default App;
