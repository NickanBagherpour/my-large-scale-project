import React from 'react';

import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';

import EditRoute from '../edit-route/edit-route';

import * as S from './app.style';
import { useSearchParams } from 'next/navigation';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const [t] = useTr();
  const searchParams = useSearchParams();
  const serviceName: Nullable<string> = searchParams.get('servicename');
  const title = serviceName ? `${t('widget_name')} ${t(serviceName)}` : t('widget_name');

  return (
    <S.AppContainer title={title}>
      <EditRoute />
    </S.AppContainer>
  );
};

export default App;
