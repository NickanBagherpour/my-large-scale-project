import { useTr } from '@oxygen/translation';
import * as S from './app.style';
import Summary from '../summary/summary';
import DataTable from '../data-table/data-table';

const App = () => {
  const [t] = useTr();
  return (
    <S.AppContainer title={t('widget_name')}>
      <Summary />
      <DataTable />
    </S.AppContainer>
  );
};

export default App;
