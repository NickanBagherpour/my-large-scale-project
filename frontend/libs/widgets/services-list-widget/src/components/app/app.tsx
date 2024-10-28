import { useAppDispatch, useAppState } from '../../context';
import { useGetServicesQuery } from '../../servicesList';
import Filters from '../filters/filters';
import Services from '../services/services';
import * as S from './app.style';
import { Loading } from '@oxygen/ui-kit';
import React from 'react';

import { useTr } from '@oxygen/translation';
import { NoResult } from '@oxygen/reusable-components';
import DraftCard from '../draft-card/draft-card';
import { useGetDraftsQuery } from '../../servicesList/get-drafts.api';
import { PageProps } from '@oxygen/types';

//import { useGetReportDataQuery } from '../../services';

// import * as S from './app.style';

// type AppProps = PageProps & {
//   //
// };

// const App: React.FC<AppProps> = (props) => {
//   const dispatch = useAppDispatch();
//   const state = useAppState();
//   const [t] = useTr();

//   // Sample Query Usage
//   const { data, isFetching, isError } = useGetReportDataQuery(prepareParams());

//   function prepareParams() {
//      const { filters,submit,pagination,...rest } = state;
//      const params = {
//        form: submit,
//        pagination: pagination,
//      };

//      return params;
//    }

//   return <S.AppContainer>ServicesListWidget</S.AppContainer>;
// };

const App = () => {
  const { errorMessage, ...fetchState } = useAppState();
  const { data: services, isFetching: isClientsFetching } = useGetServicesQuery(fetchState);
  const { data: drafts } = useGetDraftsQuery();
  const [t] = useTr();
  const hasDrafts = !!drafts?.length;
  const clientsSubTitle = services?.total ? `(${services?.total ?? 0})` : '';

  return (
    <>
      {hasDrafts && (
        <S.DraftsContainer title={t('draft')} isFullHeight={false}>
          <S.Grid>
            {drafts?.map((item) => (
              <DraftCard key={item.id} {...item} />
            ))}
          </S.Grid>
        </S.DraftsContainer>
      )}

      <S.ServicesContainer title={t('widget_name')} subtitle={clientsSubTitle} isFullHeight={!hasDrafts}>
        <Filters />
        <Loading spinning={isClientsFetching} size='large'>
          {services?.list.length ? (
            <Services
              data={services.list}
              total={services.total}
              searchTerm={fetchState.searchTerm}
              isLoading={isClientsFetching}
            />
          ) : (
            <NoResult isLoading={false} />
          )}
        </Loading>
      </S.ServicesContainer>
    </>
  );
};

export default App;
