import { useTr } from '@oxygen/translation';
import { Container } from '@oxygen/ui-kit';
import Filters from '../filters/filters';
import DataTable from '../data-table/data-table';
import { useAppState } from '../../context';
import { prepareParams } from '../../utils';
import { useGetReportsQuery } from '../../services';

const App = () => {
  const [t] = useTr();
  const state = useAppState();
  const params = prepareParams(state);
  const { data, isFetching } = useGetReportsQuery(params);

  return (
    <Container title={t('issue_invoice')} subtitle={`(${data?.totalElements})`}>
      <Filters />
      <DataTable data={data} isFetching={isFetching} />
    </Container>
  );
};

export default App;
