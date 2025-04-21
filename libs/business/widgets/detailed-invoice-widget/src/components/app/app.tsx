import { useTr } from '@oxygen/translation';
import * as S from './app.style';
import Summary from '../summary/summary';
import DataTable from '../data-table/data-table';
import { useGetInfoQuery } from '../../services';
import { Loading } from '@oxygen/ui-kit';
import { notFound, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { GlobalMessageContainer, NoResult } from '@oxygen/reusable-components';
import { useAppState, resetErrorMessageAction, useAppDispatch } from '../../context';

const App = () => {
  const [t] = useTr();
  const search = useSearchParams();
  const state = useAppState();
  const dispatch = useAppDispatch();

  const clientType = search.get('client-type');
  const id = search.get('id');
  const { data, isFetching } = useGetInfoQuery({ 'client-type': clientType!, id: id! });

  useEffect(() => {
    if (!id || !clientType) notFound();
  }, []);

  if (isFetching) return <Loading />;

  if (id === null || clientType === null) return <NoResult />;

  const clientName = data?.name ?? '';

  return (
    <>
      <GlobalMessageContainer message={state.message} onClose={() => resetErrorMessageAction(dispatch)} />
      {data ? (
        <S.AppContainer title={`${t('widget_name')} - ${clientName}`}>
          <Summary {...data} clientType={clientType} />
          <DataTable data={data} />
        </S.AppContainer>
      ) : (
        <NoResult />
      )}
    </>
  );
};

export default App;
