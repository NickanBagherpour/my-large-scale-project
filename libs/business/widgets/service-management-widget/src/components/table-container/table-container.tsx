import React, { useEffect, useState } from 'react';
import { TablePaginationConfig } from 'antd';

import { useApp } from '@oxygen/hooks';
import { Nullable } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { Button, MarkText, Modal } from '@oxygen/ui-kit';

import { useGetServiceClientsQuery, usePutServiceCommercialStatusMutation } from '../../services';
import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { TableRowValueType } from '../../types/table-row-value.type';
import { AVAILABLE_ROWS_PER_PAGE } from '../../utils/consts';
import { getDesktopColumns } from '../../utils/table-list';
import { TableResponseType } from '../../types';

import * as S from './table-container.style';

export type TableContainerPropsType = {
  data: Nullable<TableResponseType>;
  loading: boolean;
};

export const TableContainer = (props: TableContainerPropsType) => {
  const { data, loading } = props;
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();
  const { notification } = useApp();

  const [modalIsOpen, setModalIsOpen] = useState<TableRowValueType | null>(null);
  const close = () => setModalIsOpen(null);

  const { mutate, isPending } = usePutServiceCommercialStatusMutation();
  const {
    data: serviceClientData,
    isFetching: serviceClientIsFetching,
    refetch,
  } = useGetServiceClientsQuery(modalIsOpen?.name ?? '');

  useEffect(() => {
    if (modalIsOpen?.isCommercial) {
      refetch();
    }
  }, [modalIsOpen?.isCommercial]);

  const listLength = serviceClientData && serviceClientData.length;
  const serviceCount = `${listLength} سرویس`;
  const pagination = state.table.pagination;
  const tableData = data?.content ?? [];

  const lastValidTotal = data?.page?.totalElements;
  const [lastTotal, setLastTotal] = useState(lastValidTotal);

  const handleSubmit = async () => {
    const serviceName = modalIsOpen?.name;
    const servicePersianName = modalIsOpen?.persianName;
    const commercialStatus = modalIsOpen?.isCommercial ? t('noncommercial') : t('commercial');
    mutate(serviceName!, {
      onSuccess: async () => {
        setModalIsOpen(null);
        notification.success({
          message: t('success_notif', { servicePersianName, commercialStatus }),
        });
      },
    });
  };

  const handlePageChange = async ({ current, pageSize }: TablePaginationConfig) => {
    if (lastValidTotal) setLastTotal(lastValidTotal); //in case one page has error still let it paginate
    const updatedPagination = { page: current, size: pageSize };
    updatePagination(dispatch, updatedPagination);
  };
  const size = pagination?.size || AVAILABLE_ROWS_PER_PAGE[1];
  const page = pagination?.page || 1;

  const prepareColumnsParams = { data, t, pagination, setModalIsOpen };
  const tableDesctopColumns = getDesktopColumns(prepareColumnsParams);
  // const tableMobileColumns = getMobileColumns(prepareColumnsParams);

  return (
    <S.TableContainer>
      <S.Table
        loading={loading}
        dataSource={tableData}
        columns={tableDesctopColumns}
        /*mobileColumns={mobileColumns}*/
        pagination={{
          total: data?.page?.totalElements || lastTotal,
          pageSizeOptions: AVAILABLE_ROWS_PER_PAGE,
          pageSize: size,
          current: page,
          hideOnSinglePage: false,
        }}
        onChange={handlePageChange}
        rowKey={(row) => row.name}
        minHeight={'auto'}
      ></S.Table>

      <Modal
        centered
        title={t('warning')}
        open={!!modalIsOpen}
        closable={!isPending}
        onCancel={close}
        loading={serviceClientIsFetching}
        footer={[
          <Button key={'cancel'} onClick={close} size='large' color='primary' variant='outlined' disabled={isPending}>
            {t('button.cancel')}
          </Button>,
          <Button
            key={'tegister'}
            onClick={() => handleSubmit()}
            size='large'
            color='primary'
            loading={isPending}
            disabled={isPending}
          >
            {t('button.register')}
          </Button>,
        ]}
      >
        {!modalIsOpen?.isCommercial ? (
          t('change_to_commercial_modal_text')
        ) : listLength === 0 ? (
          t('change_to_non_commercial_modal_text')
        ) : (
          <>
            <MarkText
              text={t('change_to_non_commercial_modal_text_with_service_count', { service_count: serviceCount })}
              wordToHighlight={serviceCount}
              highlightColor='success'
            />
            <ul>
              {serviceClientData?.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </>
        )}
      </Modal>
    </S.TableContainer>
  );
};
