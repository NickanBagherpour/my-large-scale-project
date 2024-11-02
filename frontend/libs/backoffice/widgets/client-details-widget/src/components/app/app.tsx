import * as S from './app.style';
import { useTr } from '@oxygen/translation';
import ClientInfo from '../client-info/client-info';
import Plugins from '../plugins/plugins';
import Services from '../services/services';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Tab } from '../../types';
import { ReactNode } from 'react';
import { getValidTab } from '../../utils/tabs.util';

const App = () => {
  const [t] = useTr();
  const router = useRouter();
  const search = useSearchParams();
  const tab = getValidTab(search.get('tab'));

  const tabs: { label: string; key: Tab; children: ReactNode }[] = [
    { label: t('client_info'), key: 'client-info', children: <ClientInfo /> },
    { label: t('services'), key: 'services', children: <Services /> },
    { label: t('plugins'), key: 'plugins', children: <Plugins /> },
  ];

  return (
    <S.Container title={'App-Bale'}>
      <S.Tabs type='line' items={tabs} activeKey={tab} onTabClick={(tab) => router.replace(`?tab=${tab}`)} />
    </S.Container>
  );
};

export default App;
