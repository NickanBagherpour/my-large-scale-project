import React from 'react';

import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';
import { GlobalMessageContainer } from '@oxygen/reusable-components';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';
import { TableContainer } from '../table-container/table-container';
import { SERVICE_MANAGEMENT_STATUS } from '../../context/types';
import { useGetReportDataQuery } from '../../services';
import { Filters } from '../filters/filters';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const prepareQueryParams = () => {
    const params: {
      sort: any;
      page: any;
      size: any;
      serviceName?: string;
      isCommercial?: any;
    } = {
      sort: state.sort,
      page: state.table.pagination.page - 1,
      size: state.table.pagination.size,
    };

    const serviceName = state.searchValue;
    const isCommercial = state.status;

    if (typeof serviceName === 'string' && serviceName.trim() !== '') {
      params.serviceName = serviceName;
    }

    if (isCommercial !== SERVICE_MANAGEMENT_STATUS.ALL) {
      params.isCommercial = isCommercial;
    }

    return params;
  };

  const { data: tableData, isFetching: tableFetching } = useGetReportDataQuery(prepareQueryParams());

  return (
    <S.AppContainer title={t('widget_name')}>
      <GlobalMessageContainer message={state.message} onClose={() => resetErrorMessageAction(dispatch)} />
      <Filters />
      <TableContainer data={tableData} loading={tableFetching} />
    </S.AppContainer>
  );
};

export default App;
