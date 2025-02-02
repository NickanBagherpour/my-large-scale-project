'use client';

import { resetMessageAction, useAppDispatch, useAppState } from '../../context';
import { useGetClientsQuery } from '../../services';
import Filters from '../filters/filters';
import Clients from '../clients/clients';
import * as S from './app.style';
import { Container, Loading } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { GlobalMessageContainer, NoResult } from '@oxygen/reusable-components';
import DraftCard from '../draft-card/draft-card';
import { useGetDraftsQuery } from '../../services/get-drafts.api';
import type { ClientsParams } from '../../types';
import { CLIENTS_PAGE_SIZE } from '../../utils/consts';

const App = () => {
  const { message, page, sort, status, searchTerm } = useAppState();
  const dispatch = useAppDispatch();

  // TODO: clean this
  const paramsMap: ClientsParams = {
    page: page - 1,
    sort: sort === 'newest' ? 'createDate,DESC' : 'createDate,ASC',
    searchParam: searchTerm,
    size: CLIENTS_PAGE_SIZE,
    isActive: status === 'active' ? true : status === 'unActive' ? false : null,
  };

  const { data: clients, isFetching: isClientsFetching } = useGetClientsQuery(paramsMap);
  const { data: drafts } = useGetDraftsQuery({ page: 0, size: 10, sort: 'createDate,DESC' }); // TODO: make them dynamic
  const [t] = useTr();
  const hasDrafts = !!drafts?.totalElements;

  const totalElements = clients?.totalElements;
  const clientsSubTitle = totalElements ? `(${totalElements ?? 0})` : '';

  return (
    <>
      <GlobalMessageContainer message={message} onClose={() => resetMessageAction(dispatch)} />

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
          {totalElements ? <Clients data={clients} searchTerm={searchTerm} /> : <NoResult isLoading={false} />}
        </Loading>
      </S.ClientsContainer>
    </>
  );
};

export default App;
