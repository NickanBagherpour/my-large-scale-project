import * as S from './app.style';
import { useTr } from '@oxygen/translation';
import ClientInfo from '../client-info/client-info';
import { PageTitle, Tab } from '../../types';
import { ReactNode, useCallback, useState } from 'react';
import { Container } from '@oxygen/ui-kit';
import { useClientName } from '../../utils/use-client-name';
import { Plugins, Services } from '@oxygen/reusable-components';
import { getWidgetTitle } from '@oxygen/utils';

const App = () => {
  const [t] = useTr();
  const clientName = useClientName();
  const [currentTab, setCurrentTab] = useState<Tab>('client-info');
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
    { label: t('services'), key: 'services', children: <Services clientName={clientName} /> },
    { label: t('plugins'), key: 'plugins', children: <Plugins clientName={clientName} /> },
  ];

  const changeTab = (tab: string) => setCurrentTab(tab as Tab);

  return (
    <Container title={widgetTitle}>
      <S.Tabs type='line' items={tabs} activeKey={currentTab} onTabClick={changeTab} />
    </Container>
  );
};

export default App;
