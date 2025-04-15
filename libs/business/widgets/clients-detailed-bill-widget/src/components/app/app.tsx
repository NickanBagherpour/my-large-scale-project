import { useTr } from '@oxygen/translation';
import { Container } from '@oxygen/ui-kit';
import Filters from '../filters/filters';
import DataTable from '../data-table/data-table';
import { useAppState } from '../../context';
import { useGetReportsQuery } from '../../services';
import { prepareParams } from '../../utils';

const App = () => {
  const [t] = useTr();
  const state = useAppState();
  const params = prepareParams(state);
  const { data } = useGetReportsQuery(params);

  return (
    <Container title={t('issue_invoice')}>
      <Filters />
      <DataTable />
    </Container>
  );
};

export default App;
