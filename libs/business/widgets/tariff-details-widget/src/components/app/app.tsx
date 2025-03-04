import React, { useEffect, useState } from 'react';

import { useTr } from '@oxygen/translation';
import { getWidgetTitle } from '@oxygen/utils';
import { useSearchParams } from 'next/navigation';
import { Nullable, PageProps } from '@oxygen/types';
import { GlobalMessageContainer } from '@oxygen/reusable-components';

import { SERVICE_NAME } from '../../utils/consts';
import { GeneralInformation } from '../general-nformation/general-information';
import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const searchParams = useSearchParams();

  const serviceName: Nullable<string> = searchParams.get(SERVICE_NAME);

  const widgetTitle = getWidgetTitle({
    defaultTitle: t('widget_title'),
    secondaryTitle: serviceName,
  });

  return (
    <S.AppContainer title={widgetTitle}>
      <GlobalMessageContainer
        message={state.message}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      <GeneralInformation isLoading={false} data={[]} serviceName={serviceName} />
    </S.AppContainer>
  );
};

export default App;
