import { useTr } from '@oxygen/translation';
import { Button, InfoBox, Loading, Modal, Table, type InfoBoxProps } from '@oxygen/ui-kit';
import { type Dispatch } from 'react';
import * as S from './client-details-modal.style';
import { useGetClientServicesQuery } from '../../services';
import { ClientReportDto } from '../../types';
import { getDesktopColumns, getMobileColumns } from '../../utils/client-services.util';
import { useAppState, updateModalTablePagination } from '../../context';
import { useAppTheme } from '@oxygen/hooks';

import { TablePaginationConfig } from 'antd';

type Props = {
  isOpen: boolean;
  close: () => void;
  client: ClientReportDto;
  dispatch: Dispatch<any>;
};

export default function ClientDetailsModal(props: Props) {
  const { isOpen, close, client, dispatch } = props;
  const [t] = useTr();
  const state = useAppState();
  const theme = useAppTheme();
  const {
    table: { modalTablePagination },
  } = state;
  const { data: service, isFetching } = useGetClientServicesQuery(client);

  const handlePageChange = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      const updatedPagination = {
        page: pageSize === modalTablePagination.rowsPerPage ? current : 1,
        rowsPerPage: pageSize,
      };
      updateModalTablePagination(dispatch, updatedPagination);
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
    modalTablePagination,
  });
  const desktopColumns = getDesktopColumns({
    t,
    modalTablePagination,
  });

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
              minHeight={'auto'}
              current={modalTablePagination.page}
              total={service?.response.length}
              dataSource={service?.response}
              hasContainer={false}
              pagination={{
                pageSize: modalTablePagination.rowsPerPage,
                showSizeChanger: false,
                hideOnSinglePage: true,
              }}
              columns={desktopColumns}
              mobileColumns={mobileColumns}
              rowKey={(row) => `${row.serviceName}-${row.serviceEnglishName}`}
              onChange={handlePageChange}
            />
          </div>
        </S.Container>
      )}
    </Modal>
  );
}
