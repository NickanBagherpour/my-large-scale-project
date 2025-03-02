import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { GlobalMessageContainer } from '@oxygen/reusable-components';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';

import ScopeCreation from '../scope-creation/scope-creation';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = () => {
  const dispatch = useAppDispatch();
  const { message } = useAppState();
  const [t] = useTr();

  return (
    <S.AppContainer title={t('widget_name')}>
      <GlobalMessageContainer
        message={message}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      <ScopeCreation />
    </S.AppContainer>
  );
};

export default App;
