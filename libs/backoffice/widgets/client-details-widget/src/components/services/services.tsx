import { useTr } from '@oxygen/translation';
import * as S from './services.style';
import { useState } from 'react';
import { type TablePaginationConfig } from 'antd';
import type { Pagination } from '@oxygen/types';
import { getDesktopColumns, getMobileColumns } from '../../utils/services-table.util';
import { Button, Table } from '@oxygen/ui-kit';
import Footer from '../footer/footer';
import { ROUTES } from '@oxygen/utils';
import { useClientName } from '../../utils/use-client-name';
import ServiceSelector from './service-selector/service-selector';
import RemoveServiceModal from './remove-service-modal/remove-service-modal';
import DetailsModal from './details-modal/details-modal';
import { useAssignServiceToClient } from './utils/assign-service-to-client';
import { useUnassignServiceFromClient } from './utils/unassign-from-client';
import { Service } from './utils/services.type';

export default function Services() {
  const [t] = useTr();
  const [pagination, setPagination] = useState<Pagination>({ page: 1, rowsPerPage: 5 });
  const { page, rowsPerPage } = pagination;
  const clientName = useClientName();
  const { mutate: assignToClient } = useAssignServiceToClient();
  const { mutate: unassignFromClient } = useUnassignServiceFromClient();
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const [serviceToRemove, setServiceToRemove] = useState<Service | null>(null);
  const [serviceToView, setServiceToView] = useState<Service | null>(null);

  const isLoading = false;
  const isFetching = false;
  const currentServices = { total: selectedServices.length, list: selectedServices };

  const changePage = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      setPagination({
        page: pageSize === rowsPerPage ? current : 1,
        rowsPerPage: pageSize,
      });
    }
  };

  const onAssignToClient = (service: Service) => {
    assignToClient(
      { clientName, serviceInfoId: service.id },
      {
        onSuccess: () => {
          setSelectedServices((prev) => prev.concat(service));
        },
      }
    );
  };

  const onUnassignFromClient = () => {
    if (serviceToRemove) {
      unassignFromClient({ clientName, serviceInfoId: serviceToRemove.id });
    }
  };

  const tableData: Parameters<typeof getDesktopColumns>[0] = {
    t,
    pagination,
    addServiceToRemove: (service) => setServiceToRemove(service),
    addServiceToView: (service) => setServiceToView(service),
  };
  const desktopColumns = getDesktopColumns(tableData);
  const mobileColumns = getMobileColumns(tableData);

  return (
    <>
      <ServiceSelector disabled={false} onSelect={onAssignToClient} />
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
        total={currentServices?.total}
        dataSource={currentServices?.list}
        pagination={{ pageSize: rowsPerPage }}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        onChange={changePage}
        rowKey={(row: Service) => row.id}
      />
      <RemoveServiceModal
        onRemove={onUnassignFromClient}
        isOpen={!!serviceToRemove}
        close={() => setServiceToRemove(null)}
        name={'samat-lc-gutr-del'}
      />
      <DetailsModal isOpen={!!serviceToView} close={() => setServiceToView(null)} />
      <Footer isLoading={isLoading} />
    </>
  );
}
