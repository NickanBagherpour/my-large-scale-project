import React from 'react';

import { useTr } from '@oxygen/translation';
import { Box, Button } from '@oxygen/ui-kit';
import { getWidgetTitle } from '@oxygen/utils';
import { Nullable, PageProps } from '@oxygen/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { FooterContainer, GlobalMessageContainer, NoResult } from '@oxygen/reusable-components';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';
import { GeneralInformation } from '../general-nformation/general-information';
import { ServiceTariff } from '../service-tariff/service-tariff';
import { SERVICE_NAME } from '../../utils/consts';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const router = useRouter();
  const searchParams = useSearchParams();

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
        <ServiceTariff serviceName={serviceName} />
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
