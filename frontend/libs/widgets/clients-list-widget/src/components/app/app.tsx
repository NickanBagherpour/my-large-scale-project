import { useAppState } from '../../context';
import { useGetClientsQuery } from '../../services';
import Filters from '../filters/filters';
import Grid from '../grid/grid';
import * as S from './app.style';
import { Container, Loading } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { NoResult } from '@oxygen/reusable-components';

const App = () => {
  const { errorMessage, ...fetchState } = useAppState();
  const { data, isFetching } = useGetClientsQuery(fetchState);
  const [t] = useTr();

  return (
    <Container title={t('widget_name')} subtitle={`(${data?.total ?? 0})`}>
      <S.AppContainer>
        <Filters />
        <Loading spinning={isFetching} size='large'>
          {data?.list.length ? (
            <Grid data={data.list} total={data.total} searchTerm={fetchState.searchTerm} isLoading={isFetching} />
          ) : (
            <NoResult isLoading={false} />
          )}
        </Loading>
      </S.AppContainer>
    </Container>
  );
};

export default App;
