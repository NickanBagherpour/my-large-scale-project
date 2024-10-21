import { Loading } from '@oxygen/ui-kit';
import { useAppState } from '../../context';
import { useGetClientsQuery } from '../../services';
import Filters from '../filters/filters';
import Grid from '../grid/grid';
import Header from '../header/header';
import * as S from './app.style';

const App = () => {
  const { errorMessage, ...fetchState } = useAppState();
  const { data, isLoading } = useGetClientsQuery(fetchState);

  if (isLoading) return <Loading />;

  return (
    <S.AppContainer>
      <Header clientsCount={375} />
      <Filters />
      <Grid data={data ?? []} />
    </S.AppContainer>
  );
};

export default App;
