import React, { useEffect, useState } from 'react';

import { redirect, useRouter, useSearchParams } from 'next/navigation';

import { useApp } from '@oxygen/hooks';
import { Nullable } from '@oxygen/types';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { ROUTES, uuid } from '@oxygen/utils';
import { ReturnButton } from '@oxygen/reusable-components';
import { Button, InfoBox, Tabs, TabsProps } from '@oxygen/ui-kit';

import ScopeList from '../scope-list/scope-list';
import { useGetServiceDetailsQuery } from '../../services';
import { UpstreamList } from '../upstream-list/upstream-list';
import { useAssignToServiceMutation } from '../../services/upstream-tab/post-assign-to-service.api';
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
  const { data: serviceDetails, isFetching: isServiceFetching } = useGetServiceDetailsQuery();
  const { notification } = useApp();

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

  const { mutate, isPending, isSuccess } = useAssignToServiceMutation();
  const handleUpstreamCreation = () => {
    const params = { id: state.upstreamTab.activeSelect.cardId, serviceName: state.serviceName };
    mutate(params, {
      onSuccess: () => {
        notification.success({
          message: t('upstream_tab.success_notif'),
        });
        updateUpstreamTabCreationSubmitAction(dispatch);
      },
      onError: (error) => {
        notification.error({
          message: t(`${error}`),
        });
      },
    });
  };

  const footerButton = (
    <>
      <ReturnButton size={'large'} variant={'outlined'} onClick={handleReturn}>
        {t('button.return')}
      </ReturnButton>
      {!state.upstreamTab.activeSelect.isInitialized && (
        <Button disabled={!state.upstreamTab.activeSelect.cardId} onClick={handleUpstreamCreation} loading={isPending}>
          {t('save_changes')}
        </Button>
      )}
    </>
  );

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('general_information'),
      children: (
        <>
          <div className='service-technical-details'>
            <h3>{t('service_technical_info')}</h3>
            <div className='btn-group'>
              <Button
                type={'primary'}
                color='primary'
                variant='filled'
                icon={<i className='icon-clock' />}
                onClick={() => router.push(`${ROUTES.BACKOFFICE.SERVICE_HISTORY}?id=${servicename}&type=service`)}
              >
                {t('see_changes_history')}
              </Button>
              <Button
                type={'primary'}
                color='primary'
                variant='solid'
                icon={<i className='icon-edit' />}
                onClick={() => router.push(`/edit-service?id=1111111`)}
              >
                {t('edit')}
              </Button>
            </div>
          </div>

          <InfoBox data={serviceDetails} margin={0} loading={isServiceFetching} />
        </>
      ),
    },
    {
      key: '2',
      label: t('route'),
      children: (
        <>
          <div className='service-technical-details'>
            <h3>{t('service_technical_info')}</h3>
            <div className='btn-group'>
              <Button
                type={'primary'}
                color='primary'
                variant='filled'
                icon={<i className='icon-clock' />}
                onClick={() => router.push(`${ROUTES.BACKOFFICE.SERVICE_HISTORY}?id=${servicename}&type=service`)}
              >
                {t('see_changes_history')}
              </Button>
              <Button
                type={'primary'}
                color='primary'
                variant='solid'
                icon={<i className='icon-edit' />}
                onClick={() => router.push(`/edit-service?id=1111111`)}
              >
                {t('edit')}
              </Button>
            </div>
          </div>

          <InfoBox data={serviceDetails} margin={0} loading={isServiceFetching} />
        </>
      ),
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
