import * as S from './app.style';
import { useTr } from '@oxygen/translation';
import ClientInfo from '../client-info/client-info';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Tab } from '../../types';
import { ReactNode } from 'react';
import { getValidTab } from '../../utils/tabs.util';
import { Container } from '@oxygen/ui-kit';
import { useClientName } from '../../utils/use-client-name';
import { Plugins, Services } from '@oxygen/reusable-components';

const App = () => {
  const [t] = useTr();
  const router = useRouter();
  const search = useSearchParams();
  const tab = getValidTab(search.get('tab'));
  const clientName = useClientName();

  const tabs: { label: string; key: Tab; children: ReactNode }[] = [
    { label: t('client_info'), key: 'client-info', children: <ClientInfo /> },
    { label: t('services'), key: 'services', children: <Services clientName={clientName} /> },
    { label: t('plugins'), key: 'plugins', children: <Plugins clientName={clientName} /> },
  ];

  const changeTab = (tab: string) => {
    router.replace(`?name=${clientName}&tab=${tab}`);
  };

  return (
    <Container title={clientName}>
      <S.Tabs type='line' items={tabs} activeKey={tab} onTabClick={changeTab} />
    </Container>
  );
};

export default App;
