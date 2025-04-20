import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';

import { GlobalMessageContainer } from '@oxygen/reusable-components';
import Filters from '../filter/filter';
import { UserRoleType } from '../../types/common-types';
import { prepareInvoiceListParams } from '../../utils/helper';
import { useGetInvoiceListQuery } from '../../services/get-invoice-list.api';
import { getValueOrDash } from '@oxygen/utils';
import DataTable from '../data-table/data-table';

import * as S from './app.style';

type AppProps = PageProps & {
  role?: UserRoleType;
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
    <S.AppContainer title={t('widget_name')} subtitle={`( ${getValueOrDash(invoiceList?.page?.totalElements)} )`}>
      <GlobalMessageContainer
        message={message}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      <Filters userRole={role as UserRoleType} />
      <DataTable invoiceList={invoiceList} invoiceListFetching={invoiceListFetching} userRole={role as UserRoleType} />
    </S.AppContainer>
  );
};

export default App;
