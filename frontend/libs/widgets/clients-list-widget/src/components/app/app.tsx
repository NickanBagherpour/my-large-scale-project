import { useDebouncedValue } from '@oxygen/hooks';
import { useAppState } from '../../context';
import { useGetClientsQuery } from '../../services';
import Filters from '../filters/filters';
import Grid from '../grid/grid';
import * as S from './app.style';
import { Container, Loading } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';

const App = () => {
  const { errorMessage, ...fetchState } = useAppState();
  const [debouncedValue] = useDebouncedValue(fetchState, 500);
  const { data, isFetching } = useGetClientsQuery(debouncedValue);
  const [t] = useTr();

  return (
    <Container title={t('widget_name')} subtitle={`(${data?.total ?? 0})`}>
      <S.AppContainer>
        <Filters />
        <Loading spinning={isFetching} delay={500}>
          <Grid data={data?.list ?? []} total={data?.total} searchTerm={debouncedValue.searchTerm} />
        </Loading>
      </S.AppContainer>
    </Container>
  );
};

export default App;
