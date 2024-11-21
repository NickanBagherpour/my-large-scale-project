import React from 'react';
import { useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import Login from '../login/login';
import Register from '../register/register';
import { useAppDispatch, useAppState } from '../../context';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const searchParams = useSearchParams();
  const authType = searchParams.get('authtype');

  return <S.AppContainer>{authType === 'login' ? <Login /> : <Register title={'ثبت نام در سامانه'} />}</S.AppContainer>;
};

export default App;
