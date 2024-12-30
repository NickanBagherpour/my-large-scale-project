import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import EditRoute from '../edit-route/edit-route';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const [t] = useTr();

  return (
    <S.AppContainer title={t('widget_name')}>
      <EditRoute />
    </S.AppContainer>
  );
};

export default App;
