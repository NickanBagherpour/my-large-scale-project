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

  // Define filters state with default values
  const [filters, setFilters] = useState({
    consumerId: filterParams.clientGatewayId || '',
    serviceId: filterParams.serviceGatewayId || '',
    fromDate: filterParams.fromDate || '',
    toDate: filterParams.toDate || '',
    direction: 'DESC',
    page: 1,
    size: table.pagination.rowsPerPage || 10,
  });

  // Fetch data using the filters
  const { data: servicesLogs, isFetching: isFetchingLogs, refetch } = useGetServicesLogsQuery(filters);

  // Sync state with updated custom filters
  useEffect(() => {
    const updatedFilters = {
      consumerId: filterParams.clientGatewayId || '',
      serviceId: filterParams.serviceGatewayId || '',
      fromDate: filterParams.fromDate || '',
      toDate: filterParams.toDate || '',
      direction: 'DESC',
      page: filters.page, // Preserve the current page
      size: filters.size, // Preserve the current size
    };
    setFilters((prev) => (JSON.stringify(prev) !== JSON.stringify(updatedFilters) ? updatedFilters : prev));
  }, [filterParams]);

  // Refetch data when filters change
  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  // Handle search action
  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      page: 1, // Reset page on search
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
          total={servicesLogs?.totalElements}
          searchTerm={searchTerm}
          isLoading={isFetchingLogs}
          wordToHighlight={searchTerm ?? ''}
        />
      </S.ServicesContainer>
    </>
  );
};

export default App;
