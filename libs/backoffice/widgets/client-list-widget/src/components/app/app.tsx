'use client';

import { useAppState } from '../../context';
import { useGetClientsQuery } from '../../services';
import Filters from '../filters/filters';
import Clients from '../clients/clients';
import * as S from './app.style';
import { Container, Loading } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { NoResult } from '@oxygen/reusable-components';
import DraftCard from '../draft-card/draft-card';
import { useGetDraftsQuery } from '../../services/get-drafts.api';

const App = () => {
  const { message, ...fetchState } = useAppState();
  const { data: clients, isFetching: isClientsFetching } = useGetClientsQuery(fetchState);
  const { data: drafts } = useGetDraftsQuery({ page: 0, size: 10, sort: 'createDate,DESC' }); // TODO: make them dynamic
  const [t] = useTr();
  const hasDrafts = !!drafts?.page.totalElements;
  const clientsSubTitle = clients?.total ? `(${clients?.total ?? 0})` : '';

  return (
    <>
      {hasDrafts && (
        <Container title={t('draft')} fillContainer={false}>
          <S.Grid>
            {drafts.content?.map((item) => (
              <DraftCard key={item.clientId} {...item} />
            ))}
          </S.Grid>
        </Container>
      )}

      <S.ClientsContainer title={t('widget_name')} subtitle={clientsSubTitle}>
        <Filters />
        <Loading spinning={isClientsFetching}>
          {clients?.list.length ? (
            <Clients
              data={clients.list}
              total={clients.total}
              searchTerm={fetchState.searchTerm}
              isLoading={isClientsFetching}
            />
          ) : (
            <NoResult isLoading={false} />
          )}
        </Loading>
      </S.ClientsContainer>
    </>
  );
};

export default App;
