import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { GlobalMessageContainer, NoResult } from '@oxygen/reusable-components';
import { Tabs } from '@oxygen/ui-kit';
import { getWidgetTitle } from '@oxygen/utils';

import { Nullable } from '@oxygen/types';
import { PageProps } from '@oxygen/types';

import { resetErrorMessageAction, updateServerNameAction, useAppDispatch, useAppState } from '../../context';

import { getValidTab } from '../../utils/tabs.util';
import { useGetServiceDetailsQuery } from '../../services';
import { tabItems } from '../../utils/helper';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const [t] = useTr();
  const state = useAppState();
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const tab = getValidTab(searchParams.get('tab'));

  const router = useRouter();

  const serviceName: Nullable<string> = searchParams.get('servicename');

  const { data: serviceDetails } = useGetServiceDetailsQuery(serviceName);

  useEffect(() => {
    updateServerNameAction(dispatch, serviceName);
  }, [serviceName]);

  if (!serviceName) {
    return <NoResult isLoading={false} hasReturnButton={true} />;
  }

  const footerButton = <S.ReturnButton />;

  return (
    <S.AppContainer
      title={getWidgetTitle({
        defaultTitle: t('widget_name'),
        primaryTitle: serviceDetails?.persianName,
        secondaryTitle: serviceDetails?.name,
      })}
      style={{ minHeight: '100%' }}
      footer={footerButton}
    >
      <GlobalMessageContainer
        message={state.message}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      <Tabs
        defaultActiveKey='general-information'
        items={tabItems(t)}
        style={{ paddingTop: '3rem' }}
        activeKey={tab}
        onTabClick={(tab) => router.replace(`?servicename=${serviceName}&tab=${tab}`)}
      />
    </S.AppContainer>
  );
};

export default App;
