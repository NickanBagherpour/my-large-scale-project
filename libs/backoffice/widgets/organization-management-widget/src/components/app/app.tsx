import React from 'react';

import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { GlobalMessageContainer } from '@oxygen/reusable-components';
import { useDateLocaleListener } from '@oxygen/hooks';

import { OrganizationForm } from '../organization-form/organization-form';
import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  useDateLocaleListener();

  return (
    <S.AppContainer title={t('widget_name')}>
      <GlobalMessageContainer message={state.message} onClose={() => resetErrorMessageAction(dispatch)} />
      <OrganizationForm />
    </S.AppContainer>
  );
};

export default App;
