import { useTr } from '@oxygen/translation';
import * as S from './app.style';
import Summary from '../summary/summary';
import DataTable from '../data-table/data-table';
import { useInfoQuery } from '../../services/get-info.api';
import { useGetFinancialReportQuery, useGetNonFinancialReportQuery } from '../../services';

const App = () => {
  const [t] = useTr();
  const { data } = useInfoQuery({ 'client-type': 1, id: 1 });
  const { error } = useGetFinancialReportQuery({ gatewayId: 1, month: 1, year: 1, 'client-gateway-id': '1' });
  const { status } = useGetNonFinancialReportQuery({ gatewayId: 1, month: 1, year: 1, 'client-gateway-id': '1' });

  return (
    <S.AppContainer title={t('widget_name')}>
      <Summary />
      <DataTable />
    </S.AppContainer>
  );
};

export default App;
