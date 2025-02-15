import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useApp } from '@oxygen/hooks';
import { useTr } from '@oxygen/translation';
import { NoResult, ReturnButton } from '@oxygen/reusable-components';
import { Button, Tabs } from '@oxygen/ui-kit';

import { Nullable } from '@oxygen/types';
import { PageProps } from '@oxygen/types';

import Route from '../route-info/route-info';
import ServiceInfo from '../service-info/service-info';
import { UpstreamList } from '../upstream-list/upstream-list';
import ScopeList from '../scope-list/scope-list';
import { useAssignToServiceMutation } from '../../services/upstream-tab/post-assign-to-service.api';
import {
  updateServerNameAction,
  updateUpstreamTabCreationSubmitAction,
  useAppDispatch,
  useAppState,
} from '../../context';
import { getValidTab } from '../../utils/tabs.util';

import * as S from './app.style';
import { Documentation } from '../documentation/documentation';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const [t] = useTr();
  const { notification } = useApp();
  const state = useAppState();
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const tab = getValidTab(searchParams.get('tab'));

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };

  const isButtonDisabled = () => {
    if (activeTabKey === 'scopes') {
      return !state.scopeName;
    } else if (activeTabKey === 'upstream') {
      return !state.upstreamTab.activeSelect.cardId;
    }
    return false;
  };

  const [activeTabKey, setActiveTabKey] = useState('general-information');
  const servicename: Nullable<string> = searchParams.get('servicename');
  const title = servicename ? `${t('widget_name')} ${t(servicename)}` : t('widget_name');
  const { mutate, isPending } = useAssignToServiceMutation();

  useEffect(() => {
    updateServerNameAction(dispatch, servicename);
  }, [servicename]);

  if (!servicename) {
    return <NoResult isLoading={false} hasReturnButton={true} />;
  }

  const items = [
    {
      key: 'general-information',
      label: t('general_information'),
      children: <ServiceInfo />,
    },
    {
      key: 'route',
      label: t('route'),
      children: <Route />,
    },

    {
      key: 'scopes',
      label: t('scopes'),
      children: <ScopeList />,
    },
    {
      key: 'upstream',
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
    {
      key: 'documentation',
      label: t('documentation'),
      children: <Documentation />,
    },
  ];

  const footerButton = (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
      <ReturnButton size={'large'} variant={'outlined'} onClick={handleReturn}>
        {t('button.return')}
      </ReturnButton>

      {activeTabKey === 'upstream' && !state.upstreamTab.activeSelect.isInitialized && (
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
    <S.AppContainer title={title} style={{ minHeight: '100%' }} footer={footerButton}>
      <Tabs
        defaultActiveKey='general-information'
        items={items}
        style={{ paddingTop: '3rem' }}
        onChange={(key) => setActiveTabKey(key)}
        activeKey={tab}
        onTabClick={(tab) => router.replace(`?servicename=${servicename}&tab=${tab}`)}
      />
    </S.AppContainer>
  );
};

export default App;
