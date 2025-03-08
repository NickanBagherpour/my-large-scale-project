import { type Dispatch, useState } from 'react';
import { TablePaginationConfig } from 'antd';

import { Button, InfoBox, Modal, type InfoBoxProps, Table } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { getValueOrDash } from '@oxygen/utils';

import { getDesktopColumns, getMobileColumns } from '../../utils/cliens-list.util';
import { ServiceItemType } from '../../types';
import { useGetServiceClients } from '../../services';

import * as S from './service-detail-modal.style';
import { AVAILABLE_ROWS_PER_PAGE } from '../../utils/consts';

type Props = {
  isOpen: boolean;
  close: () => void;
  serviceName: string;
  dispatch: Dispatch<any>;
  data: ServiceItemType[];
};

export default function DetailsModal(props: Props) {
  const { isOpen, close, serviceName, dispatch, data } = props;
  const [t] = useTr();

  const [pagination, setPagination] = useState<{ page: number; rowsPerPage: number }>({
    page: 0,
    rowsPerPage: 5,
  });

  const { data: clients, isFetching } = useGetServiceClients(serviceName, dispatch);

  const serviceInfo = data.find((v) => v.serviceName === serviceName) || null;

  let generalData: InfoBoxProps['data'] = [];

  if (serviceInfo) {
    const { serviceName, servicePersianName, isActive, category, owner } = serviceInfo;

    generalData = [
      { key: t('table.service_name'), value: getValueOrDash(serviceName) },
      { key: t('table.persian_name'), value: getValueOrDash(servicePersianName) },
      { key: t('table.category'), value: getValueOrDash(category) },
      { key: t('table.owner'), value: getValueOrDash(owner) },
    ];
  }

  const handlePageChange = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      setPagination({
        page: pageSize === pagination.rowsPerPage ? current - 1 : 0,
        rowsPerPage: pageSize,
      });
    }
  };

  // const hasPagination = clients && clients?.response?.length > 5;

  const desktopColumns = getDesktopColumns({ t, pagination });
  const mobileColumns = getMobileColumns({ t, pagination });

  return (
    <Modal
      centered
      title={t('uikit.service_detail')}
      open={isOpen}
      onCancel={close}
      width={1000}
      headerDivider
      footer={[
        <Button key="close" size="large" color="primary" variant="outlined" onClick={close}>
          {t('common.close')}
        </Button>,
      ]}
    >
      <S.Container>
        <div>
          <S.Title>{t('uikit.general_info')}</S.Title>
          <InfoBox margin={0} data={generalData} />
        </div>
        <div>
          <S.Title>{t('table.client')}</S.Title>
          <Table
            loading={isFetching}
            dataSource={clients?.response}
            minHeight={'auto'}
            columns={desktopColumns}
            mobileColumns={mobileColumns}
            rowKey={(row) => row?.clientName}
            // pagination: { pageSize: pagination.rowsPerPage },
            pagination={{ pageSize: AVAILABLE_ROWS_PER_PAGE[0], showSizeChanger: false, hideOnSinglePage: true }}
            onChange={handlePageChange}
            current={pagination.page + 1}
            total={clients?.response?.length}
          />
        </div>
      </S.Container>
    </Modal>
  );
}
