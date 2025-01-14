import React, { useEffect, useState } from 'react';

import { redirect, useRouter, useSearchParams } from 'next/navigation';

import { useApp } from '@oxygen/hooks';
import { Nullable } from '@oxygen/types';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { NoResult, ReturnButton } from '@oxygen/reusable-components';
import Route from '../route-info/route-info';
import ServiceInfo from '../service-info/service-info';
import { UpstreamList } from '../upstream-list/upstream-list';
import { Button, InfoBox, Tabs, TabsProps } from '@oxygen/ui-kit';
import ScopeList from '../scope-list/scope-list';
import { useAssignToServiceMutation } from '../../services/upstream-tab/post-assign-to-service.api';
import { useAssignToServiceScopeMutation } from '../../services/upstream-tab/post-assign-to-service-scope.api';
import {
  updateServerNameAction,
  updateUpstreamTabCreationSubmitAction,
  updateScopeTabCreationSubmitAction,
  useAppDispatch,
  useAppState,
} from '../../context';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
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

  const isButtonDisabled = () => {
    if (activeTabKey === '3') {
      return !state.scopeName; // Disable if scopeName is empty for "scopes" tab
    } else if (activeTabKey === '4') {
      return !state.upstreamTab.activeSelect.cardId; // Disable if upstreamTab cardId is empty for "upstream" tab
    }
    return false; // Default: button enabled
  };

  const [activeTabKey, setActiveTabKey] = useState('1');
  const [scopeData, setScopeData] = useState(null);

  const servicename: Nullable<string> = searchParams.get('servicename');

  const { mutate, isPending } = useAssignToServiceMutation();
  const { mutate: mutateScope, isPending: isPendingScope } = useAssignToServiceScopeMutation();

  useEffect(() => {
    updateServerNameAction(dispatch, servicename);
  }, [servicename]);

  if (!servicename) {
    return <NoResult isLoading={false} handleClick={true} />;
  }

  const items = [
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
      children: (
        <ScopeList
        // updateData={(data) => {
        //   setScopeData(data);
        // }}
        />
      ),
      // onSubmit: () => {
      //   const params = { id: state.scopeName, serviceName: state.serviceName };
      //   mutateScope(params, {
      //     onSuccess: () => {
      //       notification.success({
      //         message: t('upstream_tab.success_notif'),
      //       });
      //       updateScopeTabCreationSubmitAction(dispatch);
      //     },
      //     onError: (error) => {
      //       notification.error({
      //         message: t(`${error}`),
      //       });
      //     },
      //   });
      // },
    },
    {
      key: '4',
      label: t('upstream'),
      children: <UpstreamList />,
      onSubmit: () => {
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
      },
    },
  ];

  const footerButton = (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
      <ReturnButton size={'large'} variant={'outlined'} onClick={handleReturn}>
        {t('button.return')}
      </ReturnButton>

      {activeTabKey === '4' && !state.upstreamTab.activeSelect.isInitialized && (
        <Button
          loading={isPending}
          onClick={() => {
            const currentTab = items.find((item) => item.key === activeTabKey);
            currentTab?.onSubmit?.();
          }}
          disabled={isButtonDisabled()}
        >
          {t('save_changes')}
        </Button>
      )}
    </div>
  );

  return (
    <S.AppContainer title={t('widget_name')} style={{ minHeight: '100%' }} footer={footerButton}>
      <Tabs
        defaultActiveKey='1'
        items={items}
        style={{ paddingTop: '3rem' }}
        onChange={(key) => setActiveTabKey(key)}
      />
    </S.AppContainer>
  );
};

export default App;
