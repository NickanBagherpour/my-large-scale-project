import { Container } from '@oxygen/ui-kit';
import * as S from './app.style';
import { useTr } from '@oxygen/translation';
import ClientInfo from '../client-info/client-info';
import Plugins from '../plugins/plugins';

const App = () => {
  const [t] = useTr();

  const tabs = [
    { label: t('client_info'), key: '1', children: <ClientInfo /> },
    { label: t('services'), key: '2', children: 'first tab' },
    { label: t('plugins'), key: '3', children: <Plugins /> },
  ];

  return (
    <Container title={'App-Bale'}>
      <S.Tabs
        type='line'
        onChange={(e) => console.log(':)', e)}
        activeKey='3'
        items={tabs.map(({ label, key, children }) => {
          return {
            label,
            key,
            children,
          };
        })}
      />
    </Container>
  );
};

export default App;
