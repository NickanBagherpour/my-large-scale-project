import { useTr } from '@oxygen/translation';
import * as S from './services.style';
import { type Dispatch, useEffect, useState } from 'react';
import { type TablePaginationConfig } from 'antd';
import { getDesktopColumns, getMobileColumns } from './utils/services-table.util';
import { Button, Table } from '@oxygen/ui-kit';
import { ROUTES } from '@oxygen/utils';
import ServiceSelector from './service-selector/service-selector';
import RemoveServiceModal from './remove-service-modal/remove-service-modal';
import { useAssignServiceToClient } from './utils/assign-service-to-client';
import { useUnassignServiceFromClient } from './utils/unassign-from-client';
import { Service } from './utils/services.type';
import { useGetClientServices } from './utils/get-client-services.api';
import ServiceDetailsModal from '../service-details-modal/service-details-modal';

type Props = {
  clientName: string;
  pageType: 'details' | 'creation';
  dispatch: Dispatch<any>;
  hasServices?: (hasData: boolean) => void;
};

export default function Services(props: Props) {
  const { clientName, dispatch, pageType, hasServices } = props;
  const [t] = useTr();
  const [pagination, setPagination] = useState<{ page: number; size: number }>({ page: 1, size: 5 });
  const { page, size } = pagination;
  const { mutate: assignToClient } = useAssignServiceToClient(dispatch);
  const { mutate: unassignFromClient } = useUnassignServiceFromClient(dispatch);
  const { data, isFetching } = useGetClientServices(
    {
      size,
      clientName,
      page: page - 1,
      sort: 'createDate,DESC',
    },
    dispatch
  );
  const [serviceToRemove, setServiceToRemove] = useState<Service | null>(null);
  const [serviceToView, setServiceToView] = useState<Service | null>(null);

  useEffect(() => {
    hasServices?.(!!data?.content.length);
  }, [data]);

  const changePage = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      setPagination({
        page: pageSize === size ? current : 1,
        size: pageSize,
      });
    }
  };

  const onAssignToClient = (service: Service) => {
    assignToClient({ clientName, serviceInfoId: service.id });
  };

  const onUnassignFromClient = () => {
    if (serviceToRemove) {
      unassignFromClient(
        { clientName, serviceInfoId: serviceToRemove.id },
        {
          onSuccess() {
            setServiceToRemove(null);
          },
        }
      );
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
      <ServiceSelector dispatch={dispatch} disabled={false} onSelect={onAssignToClient} />
      <S.Header>
        <S.Title>{t('uikit.client_services')}</S.Title>
        {pageType === 'details' && (
          <Button
            href={`${ROUTES.BACKOFFICE.CLIENT_SERVICE_HISTORY}?clientName=${clientName}`}
            color='primary'
            variant='filled'
          >
            <S.Icon className='icon-clock' />
            {t('uikit.display_change_history')}
          </Button>
        )}
      </S.Header>
      <Table
        loading={isFetching}
        current={page}
        total={data?.totalElements}
        dataSource={data?.content}
        pagination={{ pageSize: size }}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        onChange={changePage}
        rowKey={(row: Service) => row.id}
      />

      {!!serviceToRemove && (
        <RemoveServiceModal
          onRemove={onUnassignFromClient}
          isOpen={!!serviceToRemove}
          close={() => setServiceToRemove(null)}
          name={serviceToRemove.name}
        />
      )}
      {!!serviceToView && (
        <ServiceDetailsModal
          dispatch={dispatch}
          serviceName={serviceToView.name}
          isOpen={!!serviceToView}
          close={() => setServiceToView(null)}
        />
      )}
    </>
  );
}
