import React, { useState } from 'react';

import { TablePaginationConfig } from 'antd';

import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { Table } from '@oxygen/ui-kit';
import { ServiceDetails } from '@oxygen/reusable-components';

import { useGetServicesQuery } from '../../services/second-tab/get-table-report.api';
import { getDesktopColumns, getMobileColumns, Modal } from '../../utils/second-tab-table-utils';

import { useAppDispatch } from '../../context';

import * as S from './second-tab.style';

type SecondTabTypes = PageProps & {
  id: string;
};

const SecondTab: React.FC<SecondTabTypes> = (props) => {
  const { id } = props;

  const [t] = useTr();
  const dispatch = useAppDispatch();

  const [serviceName, setServiceName] = useState(undefined);
  const [modals, setModals] = useState<Modal>({
    details: false,
    removeService: false,
  });
  const [{ page, rowsPerPage }, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
  });

  const { data: tableDataQuery, isFetching: tableIsFetching } = useGetServicesQuery({
    page: page,
    size: rowsPerPage,
    id: id,
  });

  const updateServiceName = (name) => {
    setServiceName(name);
  };

  const toggleModal = (modal: keyof Modal, item: boolean) => {
    setModals((prev) => ({ ...prev, [modal]: item }));
  };

  const changePage = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      setPagination({
        page: pageSize === rowsPerPage ? current - 1 : 0,
        rowsPerPage: pageSize,
      });
    }
  };

  const hasPagination = tableDataQuery?.totalElements > 5;
  const tableData = tableDataQuery?.content;
  const tableParams = { t, toggleModal, updateServiceName, page, rowsPerPage };
  const desktopColumns = getDesktopColumns(tableParams);
  const mobileColumns = getMobileColumns(tableParams);
  return (
    <>
      <S.SecondTabHeader>
        <S.SecondTabTitle>{t('second_tab.title')}</S.SecondTabTitle>
      </S.SecondTabHeader>
      <Table
        dataSource={tableData}
        loading={tableIsFetching}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        rowKey={(row) => row.id}
        {...(hasPagination
          ? {
              pagination: { pageSize: rowsPerPage },
              onChange: changePage,
              current: page + 1,
              total: tableDataQuery?.totalElements,
            }
          : { pagination: false })}
      />

      {serviceName && (
        <ServiceDetails
          dispatch={dispatch}
          isOpen={modals['details']}
          serviceName={serviceName}
          close={() => toggleModal('details', false)}
        />
      )}
    </>
  );
};

export default SecondTab;
