import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';

import * as S from './app.style';
import FirstStep from '../first-step/first-step';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  return (
    <S.AppContainer fillContainer={true} title={t('widget_name')}>
      <FirstStep />
    </S.AppContainer>
  );
};

export default App;
