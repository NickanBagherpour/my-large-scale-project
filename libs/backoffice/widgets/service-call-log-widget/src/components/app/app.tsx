import { GlobalMessageContainer } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';
import { useGetServicesQuery } from '../../services';
import Filters from '../filters/filters';
import Services from '../services-list/services';

import * as S from './app.style';

const App = () => {
  const { message, searchTerm, status, sort, table, ...fetchState } = useAppState();
  const prepareServiceParams = () => {
    return {
      isActive: status,
      page: table.pagination.page - 1,
      ...(searchTerm && { 'search-field': searchTerm }),
      size: table.pagination.rowsPerPage,
      sort: 'createDate,' + (sort === 'ascending' ? 'DESC' : 'ASC'),
    };
  };
  const { data: services, isFetching: isServiceListFetching } = useGetServicesQuery(prepareServiceParams());

  const dispatch = useAppDispatch();
  const [t] = useTr();

  const servicesSubTitle = services?.totalElements ? `(${services?.totalElements ?? 0})` : '';

  return (
    <>
      <GlobalMessageContainer message={message} onClose={() => resetErrorMessageAction(dispatch)} />
      <S.ServicesContainer
        title={t('widget_name')}
        // subtitle={servicesSubTitle}
      >
        <Filters />
        <Services
          isFetching={isServiceListFetching}
          data={services?.content}
          total={services?.totalElements}
          searchTerm={searchTerm}
          isLoading={isServiceListFetching}
          wordToHighlight={searchTerm ?? ''}
          // changeStatus={(status, name) => changeStatusHandler(status, name)}
        />
      </S.ServicesContainer>
    </>
  );
};

export default App;
