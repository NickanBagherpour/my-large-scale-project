import React, { useState } from 'react';

import { TablePaginationConfig } from 'antd';

import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { Button, Table } from '@oxygen/ui-kit';

import DetailsModal from './modals/info-service-modal/info-service-modal';
// import RemoveServiceModal from './modals/remove-sevice-modal/remove-service-modal';
import { useGetServicesQuery } from '../../services/second-tab/get-table-report.api';
import { useExcelDownloadQuery } from '../../services/second-tab/get-excel-download.api';
import { getDesktopColumns, getMobileColumns, Modal } from '../../utils/second-tab-table-utils';

import * as S from './second-tab.style';

type SecondTabTypes = PageProps & {
  id: string;
};

const SecondTab: React.FC<SecondTabTypes> = (props) => {
  const { id } = props;
  //Hooks
  const [t] = useTr();
  //States
  const [serviceName, setServiceName] = useState(undefined);
  const [modals, setModals] = useState<Modal>({
    details: false,
    removeService: false,
  });
  const [{ page, rowsPerPage }, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
  });

  //Queries
  const { data: tableDataQuery, isFetching: tabelIsFetching } = useGetServicesQuery({
    page: page,
    size: rowsPerPage,
    id: id,
  });
  const { isFetching: excelIsFetching, refetch } = useExcelDownloadQuery({ id: id });
  //Handlers
  const updateServiceName = (name) => {
    setServiceName(name);
  };

  const toggleModal = (modal: keyof Modal, item: boolean) => {
    setModals((prev) => ({ ...prev, [modal]: item }));
  };

  const handlePrint = () => {
    window.print();
  };
  const handleExcleDownload = () => {
    refetch();
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
  //Constants
  const hasPagination = tableDataQuery?.totalElements > 5;
  const tableData = tableDataQuery?.content;
  const tabelParams = { t, toggleModal, updateServiceName, page, rowsPerPage };
  const desktopColumns = getDesktopColumns(tabelParams);
  const mobileColumns = getMobileColumns(tabelParams);
  return (
    <>
      <S.SecondTabHeader>
        <S.SecondTabTitle>{t('second_tab.title')}</S.SecondTabTitle>
        <S.ButtonContainer>
          <S.ButtonWraper background={'primary'}>
            <Button
              onClick={handlePrint}
              variant='link'
              color='primary'
              shape='circle'
              icon={<S.Icon className={'icon-printer'}></S.Icon>}
            ></Button>
          </S.ButtonWraper>
          <S.ButtonWraper background={'secondary'}>
            <Button
              onClick={handleExcleDownload}
              loading={excelIsFetching}
              variant='link'
              color='secondary'
              shape='circle'
              icon={<S.Icon className={'icon-excel'}></S.Icon>}
            ></Button>
          </S.ButtonWraper>
        </S.ButtonContainer>
      </S.SecondTabHeader>
      <Table
        dataSource={tableData}
        loading={tabelIsFetching}
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
      {/* uncomment when remove service is needed */}
      {/* <RemoveServiceModal
        isOpen={modals['removeService']}
        toggle={() => toggleModal('removeService')}
        id={'samat-lc-gutr-del'}
      /> */}
      {serviceName && (
        <DetailsModal isOpen={modals['details']} toggle={() => toggleModal('details', false)} name={serviceName} />
      )}
    </>
  );
};

export default SecondTab;
