import { useTr } from '@oxygen/translation';
import * as S from './app.style';
import Summary from '../summary/summary';
import DataTable from '../data-table/data-table';
import { /* useGetFinancialReportQuery, useGetNonFinancialReportQuery, */ useGetInfoQuery } from '../../services';
import { Loading } from '@oxygen/ui-kit';

const App = () => {
  const [t] = useTr();
  const { data } = useGetInfoQuery({ 'client-type': 1, id: 29 });
  // const { error } = useGetFinancialReportQuery({ gatewayId: 1, month: 1, year: 1, 'client-gateway-id': '1' });
  // const { status } = useGetNonFinancialReportQuery({ gatewayId: 1, month: 1, year: 1, 'client-gateway-id': '1' });

  console.log('>>> data', data);

  // TODO: return loading only if isFetching is true, this will return Loading even if there is an error
  if (!data) return <Loading />;

  const { clientDataList, ...summary } = data;

  return (
    <S.AppContainer title={t('widget_name')}>
      <Summary {...summary} />
      <DataTable list={clientDataList} />
    </S.AppContainer>
  );
};

export default App;
