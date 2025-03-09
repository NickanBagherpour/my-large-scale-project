import { type Dispatch, useState } from 'react';
import { TablePaginationConfig } from 'antd';

import { Button, InfoBox, Modal, type InfoBoxProps, Table } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { getValueOrDash } from '@oxygen/utils';

import { getDesktopColumns, getMobileColumns } from '../../utils/clients-list.util';
import { MODAL_INITIAL_ROW_PER_PAGE } from '../../utils/consts';
import { useGetServiceClients } from '../../services';
import { ServiceItemType } from '../../types';

import * as S from './service-detail-modal.style';

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

  const [modalTablePagination, setModalTablePagination] = useState<{ page: number; rowsPerPage: number }>({
    page: 0,
    rowsPerPage: MODAL_INITIAL_ROW_PER_PAGE,
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
      setModalTablePagination({
        page: pageSize === modalTablePagination.rowsPerPage ? current - 1 : 0,
        rowsPerPage: pageSize,
      });
    }
  };

  const desktopColumns = getDesktopColumns({ t, modalTablePagination });
  const mobileColumns = getMobileColumns({ t, modalTablePagination });

  return (
    <Modal
      centered
      title={t('uikit.service_detail')}
      open={isOpen}
      onCancel={close}
      width={1000}
      headerDivider
      footer={[
        <Button key='close' size='large' color='primary' variant='outlined' onClick={close}>
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
            minHeight={'auto'}
            current={modalTablePagination.page}
            total={clients?.response?.length}
            dataSource={clients?.response}
            hasContainer={false}
            pagination={{
              pageSize: modalTablePagination.rowsPerPage,
              showSizeChanger: false,
              hideOnSinglePage: true,
            }}
            columns={desktopColumns}
            mobileColumns={mobileColumns}
            rowKey={(row) => `${row?.clientName}-${row?.clientPersianName}`}
            onChange={handlePageChange}
          />
        </div>
      </S.Container>
    </Modal>
  );
}
