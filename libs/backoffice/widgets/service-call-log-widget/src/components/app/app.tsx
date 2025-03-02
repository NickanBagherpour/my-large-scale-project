import { GlobalMessageContainer } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';
import { useGetServicesLogsQuery } from '../../services';
import Filter from '../filters/filters';
import Services from '../services-list/services';

import * as S from './app.style';
import { useEffect, useState } from 'react';
import { useDateLocaleListener } from '@oxygen/hooks';

const App = () => {
  const { message, searchTerm, table } = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();

  useDateLocaleListener();

  const customFilters = new URLSearchParams(useAppState().table.filters);
  const filterParams = Object.fromEntries(customFilters.entries());

  const [filters, setFilters] = useState({
    consumerId: filterParams.clientGatewayId || '',
    serviceId: filterParams.serviceGatewayId || '',
    fromDate: filterParams.fromDate || '',
    toDate: filterParams.toDate || '',
    direction: 'DESC',
    page: 1,
    size: table.pagination.rowsPerPage || 10,
  });

  const { data: servicesLogs, isFetching: isFetchingLogs, refetch } = useGetServicesLogsQuery(filters);

  useEffect(() => {
    const updatedFilters = {
      consumerId: filterParams.clientGatewayId || '',
      serviceId: filterParams.serviceGatewayId || '',
      fromDate: filterParams.fromDate || '',
      toDate: filterParams.toDate || '',
      direction: 'DESC',
      page: filters.page,
      size: filters.size,
    };
    setFilters((prev) => (JSON.stringify(prev) !== JSON.stringify(updatedFilters) ? updatedFilters : prev));
  }, [filterParams]);

  useEffect(() => {
    if (!filters.consumerId && !filters.serviceId && !filters.fromDate && !filters.toDate) return;
    refetch();
  }, [filters, refetch]);

  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      size: table.pagination.rowsPerPage || 10,
    }));
  };

  return (
    <>
      <GlobalMessageContainer message={message} onClose={() => resetErrorMessageAction(dispatch)} />
      <S.ServicesContainer title={t('widget_name')}>
        <Filter filters={filters} setFilters={setFilters} onSearch={handleSearch} />
        <Services
          isFetching={isFetchingLogs}
          data={servicesLogs?.response?.content}
          total={servicesLogs?.page?.totalElements}
          searchTerm={searchTerm}
          isLoading={isFetchingLogs}
          wordToHighlight={searchTerm ?? ''}
        />
      </S.ServicesContainer>
    </>
  );
};

export default App;
