import { useTr } from '@oxygen/translation';
import { Container } from '@oxygen/ui-kit';
import Filters from '../filters/filters';
import DataTable from '../data-table/data-table';

const App = () => {
  const [t] = useTr();

  return (
    <Container title={t('issue_invoice')}>
      <Filters />
      <DataTable />
    </Container>
  );
};

export default App;
