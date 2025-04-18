import { useTr } from '@oxygen/translation';
import * as S from './app.style';
import Summary from '../summary/summary';
import DataTable from '../data-table/data-table';
import { useGetInfoQuery } from '../../services';
import { Loading } from '@oxygen/ui-kit';
import { notFound, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const App = () => {
  const [t] = useTr();
  const search = useSearchParams();
  const clientType = search.get('client-type');
  const id = search.get('id');
  const { data } = useGetInfoQuery({ 'client-type': clientType!, id: id! });

  useEffect(() => {
    if (!id || !clientType) notFound();
  }, []);

  // TODO: return loading only if isFetching is true, this will return Loading even if there is an error
  if (!data) return <Loading />;

  const { clientDataList, ...summary } = data;

  const clientName = data.name ?? '';

  return (
    <S.AppContainer title={`${t('widget_name')} - ${clientName}`}>
      <Summary {...summary} />
      <DataTable data={data} />
    </S.AppContainer>
  );
};

export default App;
