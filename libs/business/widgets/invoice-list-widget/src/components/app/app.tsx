import { useTr } from '@oxygen/translation';
import { Container } from '@oxygen/ui-kit';
import Filters from '../filters/filters';
import DataTable from '../data-table/data-table';
import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';
import { prepareParams } from '../../utils';
import { useGetReportsQuery } from '../../services';
import { GlobalMessageContainer } from '@oxygen/reusable-components';

const App = () => {
  const [t] = useTr();
  const state = useAppState();
  const dispatch = useAppDispatch();
  const params = prepareParams(state);
  const { data, isFetching } = useGetReportsQuery(params);
  const subtitle = data?.totalElements ? `(${data?.totalElements})` : '';

  return (
    <>
      <GlobalMessageContainer message={state.message} onClose={() => resetErrorMessageAction(dispatch)} />
      <Container title={t('issue_invoice')} subtitle={subtitle}>
        <Filters />
        <DataTable data={data} isFetching={isFetching} />
      </Container>
    </>
  );
};

export default App;
