import { useTr } from '@oxygen/translation';
import { Button, InfoBox, Loading, Modal, Table, type InfoBoxProps } from '@oxygen/ui-kit';
import { type Dispatch, useState } from 'react';
import * as S from './client-details-modal.style';
import { useGetClientServicesQuery } from '../../services';
import { ClientReportDto } from '../../types';
import { getDesktopColumns, getMobileColumns } from '../../utils/client-services.util';
import { AVAILABLE_ROWS_PER_PAGE } from '../../utils/consts';
import { TablePaginationConfig } from 'antd';

type Props = {
  isOpen: boolean;
  close: () => void;
  client: ClientReportDto;
  dispatch: Dispatch<any>;
};

export default function ClientDetailsModal(props: Props) {
  const { isOpen, close, client } = props;
  const [t] = useTr();

  const { data: service, isFetching } = useGetClientServicesQuery(client);

  const [pagination, setPagination] = useState<{ page: number; rowsPerPage: number }>({
    page: 0,
    rowsPerPage: AVAILABLE_ROWS_PER_PAGE[0],
  });

  const handlePageChange = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      setPagination({
        page: pageSize === pagination.rowsPerPage ? current - 1 : 0,
        rowsPerPage: pageSize,
      });
    }
  };

  let generalData: InfoBoxProps['data'] = [];

  generalData = [
    { key: t('table.english_name'), value: client.clientEnName },
    { key: t('table.persian_name'), value: client.clientPersianName },
    { key: t('info.client_key'), value: client.clientKey },
    { key: t('info.create_date'), value: client.createDate },
    { key: t('info.organizationName'), value: client.organizationName },
    { key: t('info.organizationNationalId'), value: client.organizationNationalId },
    { key: t('info.websiteUrl'), value: client.websiteUrl },
  ];

  const mobileColumns = getMobileColumns({
    t,
    pagination,
  });
  const desktopColumns = getDesktopColumns({
    t,
    pagination,
  });

  return (
    <Modal
      centered
      title={t('uikit.client_detail')}
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
      {isFetching ? (
        <Loading />
      ) : (
        <S.Container>
          <div>
            <S.Title>{t('uikit.general_info')}</S.Title>
            <InfoBox margin={0} data={generalData} />
          </div>
          <div>
            <S.Title>{t('element.service')}</S.Title>
            <Table
              loading={isFetching}
              dataSource={service?.response}
              hasContainer={false}
              minHeight={'auto'}
              columns={desktopColumns}
              mobileColumns={mobileColumns}
              rowKey={(row) => `${row.serviceName}-${row.serviceEnglishName}`}
              current={pagination.page + 1}
              total={service?.response?.length}
              pagination={{ pageSize: AVAILABLE_ROWS_PER_PAGE[0], showSizeChanger: false, hideOnSinglePage: true }}
              onChange={handlePageChange}
            />
          </div>
        </S.Container>
      )}
    </Modal>
  );
}
