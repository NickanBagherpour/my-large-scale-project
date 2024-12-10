import React, { useState } from 'react';

import { redirect, useRouter, useSearchParams } from 'next/navigation';

import { Nullable } from '@oxygen/types';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { ROUTES, uuid } from '@oxygen/utils';
import ScopeList from '../scope-list/scope-list';
import { ReturnButton } from '@oxygen/reusable-components';
import { useGetServiceDetailsQuery } from '../../services';
import { UpstreamList } from '../upstream-list/upstream-list';
import { updateUpstreamTabCreationSubmitAction, useAppDispatch, useAppState } from '../../context';
import { Button, Container, InfoBox, Table, Tabs, TabsProps } from '@oxygen/ui-kit';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const { data: serviceDetails, isFetching: isServiceFetching } = useGetServiceDetailsQuery();

  // const [pagination, setPagination] = useState<Pagination>({ page: 1, rowsPerPage: 5 });
  const state = useAppState();
  const dispatch = useAppDispatch();

  const [t] = useTr();
  const searchParams = useSearchParams();

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };

  const id: Nullable<string> = searchParams.get('id');
  if (!id) {
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
      label: t('service_information'),
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
                onClick={() => router.push(`${ROUTES.BACKOFFICE.SERVICE_HISTORY}?id=${id}&type=service`)}
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
      label: t('scopes'),
      children: <ScopeList />,
    },
    {
      key: '3',
      label: t('upstream'),
      children: <UpstreamList />,
    },
    {
      key: '4',
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
                onClick={() => router.push(`${ROUTES.BACKOFFICE.SERVICE_HISTORY}?id=${id}&type=service`)}
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
  ];

  return (
    <S.AppContainer title={t('widget_name')} style={{ minHeight: '100%' }} footer={footerButton}>
      {/* change the defaultActiveKey to 1  */}
      <Tabs defaultActiveKey='3' items={items} style={{ paddingTop: '3rem' }} />
    </S.AppContainer>
  );
};

export default App;
