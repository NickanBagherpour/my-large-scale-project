import React, { useEffect, useState } from 'react';

import { redirect, useRouter, useSearchParams } from 'next/navigation';

import { Nullable } from '@oxygen/types';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { ROUTES, uuid } from '@oxygen/utils';
import { ReturnButton } from '@oxygen/reusable-components';
import Route from '../route-info/route-info';
import ServiceInfo from '../service-info/service-info';
import { UpstreamList } from '../upstream-list/upstream-list';
import { Button, InfoBox, Tabs, TabsProps } from '@oxygen/ui-kit';
import ScopeList from '../scope-list/scope-list';
import {
  updateServerNameAction,
  updateUpstreamTabCreationSubmitAction,
  useAppDispatch,
  useAppState,
} from '../../context';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  // const [pagination, setPagination] = useState<Pagination>({ page: 1, rowsPerPage: 5 });
  const state = useAppState();
  const dispatch = useAppDispatch();

  const [t] = useTr();
  const searchParams = useSearchParams();

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };
  //to do : change id to service name
  const servicename: Nullable<string> = searchParams.get('servicename');

  useEffect(() => {
    updateServerNameAction(dispatch, servicename);
  }, [servicename]);

  if (!servicename) {
    redirect('/not-found');
  }
  const handleUpstreamCreation = () => {
    updateUpstreamTabCreationSubmitAction(dispatch);
  };
  const footerButton = (
    <>
      <ReturnButton size={'large'} variant={'outlined'} onClick={handleReturn}>
        {t('button.return')}
      </ReturnButton>
      {!state.upstreamTab.activeSelect.isInitialized && (
        <Button disabled={!state.upstreamTab.activeSelect.cardId} onClick={handleUpstreamCreation}>
          {t('save_changes')}
        </Button>
      )}
    </>
  );

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('general_information'),
      children: <ServiceInfo />,
    },
    {
      key: '2',
      label: t('route'),
      children: <Route />,
    },
    {
      key: '3',
      label: t('scopes'),
      children: <ScopeList />,
    },
    {
      key: '4',
      label: t('upstream'),
      children: <UpstreamList />,
    },
  ];

  return (
    <S.AppContainer title={t('widget_name')} style={{ minHeight: '100%' }} footer={footerButton}>
      <Tabs defaultActiveKey='1' items={items} style={{ paddingTop: '3rem' }} />
    </S.AppContainer>
  );
};

export default App;
