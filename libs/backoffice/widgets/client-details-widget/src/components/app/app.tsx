import * as S from './app.style';
import { useTr } from '@oxygen/translation';
import ClientInfo from '../client-info/client-info';
import { PageTitle, Tab } from '../../types';
import { ReactNode, useCallback, useState } from 'react';
import { Container } from '@oxygen/ui-kit';
import { useClientName } from '../../utils/use-client-name';
import { GlobalMessageContainer, Plugins, Services } from '@oxygen/reusable-components';
import { getWidgetTitle } from '@oxygen/utils';
import { resetMessageAction, useAppDispatch, useAppState } from '../../context';

const App = () => {
  const [t] = useTr();
  const { message } = useAppState();
  const dispatch = useAppDispatch();
  const clientName = useClientName();
  const [currentTab, setCurrentTab] = useState<Tab>('plugins');
  const [localizedTitle, setLocalizedTitle] = useState<PageTitle>({ persian: '', english: '' });

  const widgetTitle = getWidgetTitle({
    defaultTitle: t('client_details'),
    primaryTitle: localizedTitle.persian,
    secondaryTitle: localizedTitle.english,
  });

  const updateTitle = useCallback((title: PageTitle) => {
    setLocalizedTitle(title);
  }, []);

  const tabs: { label: string; key: Tab; children: ReactNode }[] = [
    { label: t('client_info'), key: 'client-info', children: <ClientInfo updateTitle={updateTitle} /> },
    {
      label: t('services'),
      key: 'services',
      children: <Services pageType='details' dispatch={dispatch} clientName={clientName} />,
    },
    { label: t('plugins'), key: 'plugins', children: <Plugins dispatch={dispatch} clientName={clientName} /> },
  ];

  const changeTab = (tab: string) => setCurrentTab(tab as Tab);

  return (
    <>
      <GlobalMessageContainer message={message} onClose={() => resetMessageAction(dispatch)} />
      <Container title={widgetTitle}>
        <S.Tabs type='line' items={tabs} activeKey={currentTab} onTabClick={changeTab} />
      </Container>
    </>
  );
};

export default App;
