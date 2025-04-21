import React from 'react';

import { GlobalMessageContainer } from '@oxygen/reusable-components';
import { getValueOrDash } from '@oxygen/utils';
import { useTr } from '@oxygen/translation';
import { PageProps, UserRole } from '@oxygen/types';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';
import { prepareInvoiceListParams } from '../../utils/helper';
import { useGetInvoiceListQuery } from '../../services';
import DataTable from '../data-table/data-table';
import Filters from '../filter/filter';

import * as S from './app.style';

type AppProps = PageProps & {
  role?: UserRole;
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const [t] = useTr();
  const role = props.parentProps?.role;

  const {
    searchTerm,
    pagination: { page, rowsPerPage },
    status,
    sort,
    message,
    filters,
  } = useAppState();

  const invoiceListParams = {
    searchTerm,
    page,
    rowsPerPage,
    status,
    sort,
  };

  const { data: invoiceList, isFetching: invoiceListFetching } = useGetInvoiceListQuery(
    prepareInvoiceListParams(invoiceListParams, role, filters)
  );

  return (
    <S.AppContainer title={t('widget_name')} subtitle={`( ${getValueOrDash(invoiceList?.totalElements)} )`}>
      <GlobalMessageContainer
        message={message}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      <Filters userRole={role as UserRole} />
      <DataTable invoiceList={invoiceList} invoiceListFetching={invoiceListFetching} userRole={role as UserRole} />
    </S.AppContainer>
  );
};

export default App;
