import { useDebouncedValue } from '@oxygen/hooks';
import { useAppState } from '../../context';
import { useGetClientsQuery } from '../../services';
import Filters from '../filters/filters';
import Grid from '../grid/grid';
import Header from '../header/header';
import * as S from './app.style';
import { Spin } from 'antd';

const App = () => {
  const { errorMessage, ...fetchState } = useAppState();
  const [value] = useDebouncedValue(fetchState, 500);
  const { data, isFetching } = useGetClientsQuery(value);

  return (
    <S.AppContainer>
      <Header clientsCount={375} />
      <Filters />
      <Spin spinning={isFetching} delay={500}>
        <Grid data={data?.list ?? []} total={data?.total} />
      </Spin>
    </S.AppContainer>
  );
};

export default App;
