import { useTr } from '@oxygen/translation';
import * as S from './services.style';
import RemoveServiceModal from '../remove-service-modal/remove-service-modal';
import { useToggle } from '@oxygen/hooks';
import DetailsModal from '../details-modal/details-modal';
import StartServiceModal from '../start-service-modal/start-service-modal';
import StopServiceModal from '../stop-service-modal/stop-service-modal';
import { useState } from 'react';
import { useGetServicesQuery } from '../../services';
import { type TablePaginationConfig } from 'antd';
import type { Pagination } from '@oxygen/types';
import { getDesktopColumns, getMobileColumns } from '../../utils/services-table.util';
import { Input } from '@oxygen/ui-kit';

export default function Services() {
  const [t] = useTr();
  const [isRemoveModalOpen, toggleIsRemoveModalOpen] = useToggle(false);
  const [isDetailsModalOpen, toggleIsDetailsModalOpen] = useToggle(false);
  const [isStopModalOpen, toggleIsStopModalOpen] = useToggle(false);
  const [isStartModalOpen, toggleIsStartModalOpen] = useToggle(false);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, rowsPerPage: 5 });
  const { page, rowsPerPage } = pagination;

  const { data, isFetching } = useGetServicesQuery(pagination);

  const changePage = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      setPagination({
        page: pageSize === pagination.rowsPerPage ? current : 1,
        rowsPerPage: pageSize,
      });
    }
  };

  const tableData = {
    t,
    page,
    rowsPerPage,
    toggleIsStopModalOpen,
    toggleIsStartModalOpen,
    toggleIsRemoveModalOpen,
    toggleIsDetailsModalOpen,
  };
  const desktopColumns = getDesktopColumns(tableData);
  const mobileColumns = getMobileColumns(tableData);

  return (
    <>
      <S.Header>
        <S.Title>{t('client_services')}</S.Title>
        <Input placeholder={t('searchByNames')} prefix={<i className='icon-search-normal' />} />
      </S.Header>

      <S.Table
        loading={isFetching}
        current={pagination.page}
        total={data?.total}
        dataSource={data?.list}
        pagination={{ pageSize: pagination.rowsPerPage }}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        onChange={changePage}
        scroll={{ x: 'max-content' }}
      />

      <StopServiceModal isOpen={isStopModalOpen} toggle={toggleIsStopModalOpen} id={'samat-lc-gutr-del'} />
      <StartServiceModal isOpen={isStartModalOpen} toggle={toggleIsStartModalOpen} id={'samat-lc-gutr-del'} />
      <RemoveServiceModal isOpen={isRemoveModalOpen} toggle={toggleIsRemoveModalOpen} id={'samat-lc-gutr-del'} />
      <DetailsModal isOpen={isDetailsModalOpen} toggle={toggleIsDetailsModalOpen} />
    </>
  );
}
