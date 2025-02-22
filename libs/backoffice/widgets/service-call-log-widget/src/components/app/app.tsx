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
      searchTerm: searchTerm,
      size: table.pagination.rowsPerPage,
      sort: 'createDate,' + (sort === 'ascending' ? 'DESC' : 'ASC'),
    };
  };
  const { data: services, isFetching: isServiceListFetching } = useGetServicesQuery(prepareServiceParams());

  const dispatch = useAppDispatch();
  const [t] = useTr();

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
