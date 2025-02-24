import { GlobalMessageContainer } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';
import { useGetServicesQuery } from '../../services';
import Filters from '../filters/filters';
import Services from '../services-list/services';

import * as S from './app.style';

const App = () => {
  const { message, searchTerm, status, sort, table, ...fetchState } = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();
  const prepareServiceParams = () => {
    const parsedSearchTerm = new URLSearchParams(searchTerm);

    return {
      clientGatewayId: parsedSearchTerm.get('clientGatewayId') || '',
      serviceGatewayId: parsedSearchTerm.get('serviceGatewayId') || '',
      fromDate: parsedSearchTerm.get('fromDate') || '',
      toDate: parsedSearchTerm.get('toDate') || '',
      page: table.pagination.page - 1,
      size: table.pagination.rowsPerPage,
      sort: 'createDate,' + (sort === 'ascending' ? 'ASC' : 'DESC'), // Corrected DESC/ASC logic
    };
  };

  const { data: services, isFetching: isServiceListFetching } = useGetServicesQuery(prepareServiceParams());

  return (
    <>
      <GlobalMessageContainer message={message} onClose={() => resetErrorMessageAction(dispatch)} />
      <S.ServicesContainer title={t('widget_name')}>
        <Filters />
        <Services
          isFetching={isServiceListFetching}
          data={services?.content}
          total={services?.totalElements}
          searchTerm={searchTerm}
          isLoading={isServiceListFetching}
          wordToHighlight={searchTerm ?? ''}
        />
      </S.ServicesContainer>
    </>
  );
};

export default App;
