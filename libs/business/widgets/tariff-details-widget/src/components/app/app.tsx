import React, { useEffect, useState } from 'react';

import { useTr } from '@oxygen/translation';
import { getWidgetTitle } from '@oxygen/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { Nullable, PageProps } from '@oxygen/types';
import { FooterContainer, GlobalMessageContainer, NoResult } from '@oxygen/reusable-components';

import { SERVICE_NAME } from '../../utils/consts';
import { ServiceTariff } from '../service-tariff/service-tariff';
import { GeneralInformation } from '../general-nformation/general-information';
import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';

import * as S from './app.style';
import { Box, Button } from '@oxygen/ui-kit';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const searchParams = useSearchParams();
  const router = useRouter();

  const serviceName: Nullable<string> = searchParams.get(SERVICE_NAME);

  const widgetTitle = getWidgetTitle({
    defaultTitle: t('widget_title'),
    secondaryTitle: serviceName,
  });

  const renderPage = () => {
    if (!serviceName) {
      return <NoResult />;
    }
    return (
      <>
        <GeneralInformation isLoading={false} data={[]} serviceName={serviceName} />
        <ServiceTariff />
      </>
    );
  };
  const handleReturn = () => {
    router.back();
  };
  return (
    <S.AppContainer title={widgetTitle}>
      <GlobalMessageContainer
        message={state.message}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      <Box flexGrow={1}>{renderPage()}</Box>
      <FooterContainer>
        <Button variant='outlined' onClick={handleReturn}>
          {t('button.return')}
        </Button>
      </FooterContainer>
    </S.AppContainer>
  );
};

export default App;
