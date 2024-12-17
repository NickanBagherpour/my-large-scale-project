import React, { useState } from 'react';

import { redirect, useRouter, useSearchParams } from 'next/navigation';

import { Nullable } from '@oxygen/types';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { ROUTES, uuid } from '@oxygen/utils';
import ScopeList from '../scope-list/scope-list';
import { ReturnButton } from '@oxygen/reusable-components';
import { useGetServiceDetailsQuery } from '../../services';
import Route from '../route/route';
import { UpstreamList } from '../upstream-list/upstream-list';
import { updateUpstreamTabCreationSubmitAction, useAppDispatch, useAppState } from '../../context';
import { Button, InfoBox, Tabs, TabsProps } from '@oxygen/ui-kit';

import * as S from './app.style';
import { RADIO_GROUP_NAME } from '../../utils/consts';

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
      {!state.upstreamTab.activeSelect.isInitialized &&
        state.upstreamTab.radioValue === `${RADIO_GROUP_NAME.SELECT}` && (
          <Button disabled={!state.upstreamTab.activeSelect.cardId} onClick={handleUpstreamCreation}>
            {t('save_changes')}
          </Button>
        )}
      {!state.upstreamTab.activeSelect.isInitialized &&
        state.upstreamTab.radioValue === `${RADIO_GROUP_NAME.CREATE}` && (
          <Button
            disabled={
              !(
                !!state.upstreamTab.fallbackSelect.englishName &&
                !!state.upstreamTab.fallbackSelect.persianName &&
                !!state.upstreamTab.fallbackSelect.servers.length
              )
            }
            onClick={() => console.log(state.upstreamTab.fallbackSelect)}
          >
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
      children: <Route />,
    },
  ];

  return (
    <S.AppContainer title={t('widget_name')} style={{ minHeight: '100%' }} footer={footerButton}>
      <Tabs defaultActiveKey='1' items={items} style={{ paddingTop: '3rem' }} />
    </S.AppContainer>
  );
};

export default App;
