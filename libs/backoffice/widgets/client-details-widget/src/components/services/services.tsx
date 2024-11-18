import { useTr } from '@oxygen/translation';
import * as S from './services.style';
import RemoveServiceModal from '../remove-service-modal/remove-service-modal';
import DetailsModal from '../details-modal/details-modal';
import StartServiceModal from '../start-service-modal/start-service-modal';
import StopServiceModal from '../stop-service-modal/stop-service-modal';
import { useState } from 'react';
import { useGetServicesQuery } from '../../services';
import { type TablePaginationConfig } from 'antd';
import type { Pagination, Service } from '@oxygen/types';
import { getDesktopColumns, getMobileColumns } from '../../utils/services-table.util';
import { Input, Table } from '@oxygen/ui-kit';
import { Modals } from '../../types';
import Footer from '../footer/footer';

export default function Services() {
  const [t] = useTr();
  const [modals, setModals] = useState<Modals>({
    details: false,
    stopService: false,
    startService: false,
    removeService: false,
  });
  const [pagination, setPagination] = useState<Pagination>({ page: 1, rowsPerPage: 5 });
  const { page, rowsPerPage } = pagination;

  const { data, isFetching, isLoading } = useGetServicesQuery(pagination);

  const changePage = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      setPagination({
        page: pageSize === rowsPerPage ? current : 1,
        rowsPerPage: pageSize,
      });
    }
  };

  const toggleModal = (modal: keyof Modals) => {
    setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };

  const tableData = { t, pagination, toggleModal };
  const desktopColumns = getDesktopColumns(tableData);
  const mobileColumns = getMobileColumns(tableData);

  return (
    <>
      <S.FormItem name={'clientService'} label={t('client_services')} colon={false}>
        <Input placeholder={t('searchByNames')} prefix={<i className='icon-search-normal' />} />
      </S.FormItem>

      <Table
        loading={isFetching}
        current={page}
        total={data?.total}
        dataSource={data?.list}
        pagination={{ pageSize: rowsPerPage }}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        onChange={changePage}
        rowKey={(row: Service) => row.idx}
      />

      <StopServiceModal
        isOpen={modals['stopService']}
        toggle={() => toggleModal('stopService')}
        id={'samat-lc-gutr-del'}
      />
      <StartServiceModal
        isOpen={modals['startService']}
        toggle={() => toggleModal('startService')}
        id={'samat-lc-gutr-del'}
      />
      <RemoveServiceModal
        isOpen={modals['removeService']}
        toggle={() => toggleModal('removeService')}
        id={'samat-lc-gutr-del'}
      />
      <DetailsModal isOpen={modals['details']} toggle={() => toggleModal('details')} />
      <Footer isLoading={isLoading} />
    </>
  );
}
