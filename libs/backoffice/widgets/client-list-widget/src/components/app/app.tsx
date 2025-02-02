'use client';

import { resetMessageAction, useAppDispatch, useAppState } from '../../context';
import { useGetClientsQuery } from '../../services';
import Filters from '../filters/filters';
import Clients from '../clients/clients';
import * as S from './app.style';
import { Loading } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { GlobalMessageContainer, NoResult } from '@oxygen/reusable-components';
import type { ClientsParams } from '../../types';
import { CLIENTS_PAGE_SIZE } from '../../utils/consts';
import Drafts from '../drafts/drafts';

const App = () => {
  const { message, page, sort, status, searchTerm } = useAppState();
  const dispatch = useAppDispatch();

  const paramsMap: ClientsParams = {
    page: page - 1,
    sort: sort === 'newest' ? 'createDate,DESC' : 'createDate,ASC',
    searchParam: searchTerm,
    size: CLIENTS_PAGE_SIZE,
    isActive: status === 'active' ? true : status === 'unActive' ? false : null,
  };

  const { data: clients, isFetching: isFetchingClients } = useGetClientsQuery(paramsMap);
  const [t] = useTr();

  const totalElements = clients?.totalElements;
  const clientsSubTitle = totalElements ? `(${totalElements ?? 0})` : '';

  return (
    <>
      <GlobalMessageContainer message={message} onClose={() => resetMessageAction(dispatch)} />
      <Drafts />
      <S.ClientsContainer title={t('widget_name')} subtitle={clientsSubTitle}>
        <Filters />
        <Loading spinning={isFetchingClients}>
          {totalElements ? <Clients clients={clients} /> : <NoResult isLoading={false} />}
        </Loading>
      </S.ClientsContainer>
    </>
  );
};

export default App;
