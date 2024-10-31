import { Container } from '@oxygen/ui-kit';
import * as S from './app.style';
import { useTr } from '@oxygen/translation';
import ClientInfo from '../client-info/client-info';
import Plugins from '../plugins/plugins';
import Services from '../services/services';

const App = () => {
  const [t] = useTr();

  const tabs = [
    { label: t('client_info'), key: '1', children: <ClientInfo /> },
    { label: t('services'), key: '2', children: <Services /> },
    { label: t('plugins'), key: '3', children: <Plugins /> },
  ];

  return (
    <Container title={'App-Bale'}>
      <S.Tabs type='line' activeKey='1' items={tabs} />
    </Container>
  );
};

export default App;
