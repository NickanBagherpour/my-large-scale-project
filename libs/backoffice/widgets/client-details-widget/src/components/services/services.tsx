import { useTr } from '@oxygen/translation';
import * as S from './services.style';
import RemoveServiceModal from '../remove-service-modal/remove-service-modal';
import DetailsModal from '../details-modal/details-modal';
import { useState } from 'react';
import { type TablePaginationConfig } from 'antd';
import type { Pagination, Service } from '@oxygen/types';
import { getDesktopColumns, getMobileColumns } from '../../utils/services-table.util';
import { Button, Table } from '@oxygen/ui-kit';
import { Modals } from '../../types';
import Footer from '../footer/footer';
import ServiceSelector from '../service-selector/service-selector';
import { ROUTES } from '@oxygen/utils';
import { useClientName } from '../../utils/use-client-name';

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
  const clientName = useClientName();

  const isLoading = false;
  const isFetching = false;
  const data = { total: 0, list: [] };

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
      <ServiceSelector disabled={false} onSelect={() => void 1} />

      <S.Header>
        <S.Title>{t('client_services')}</S.Title>
        <Button
          href={`${ROUTES.BACKOFFICE.CLIENT_SERVICE_HISTORY}?clientId=${clientName}`}
          color='primary'
          variant='filled'
        >
          <S.Icon className='icon-clock' />
          {t('display_change_history')}
        </Button>
      </S.Header>

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
