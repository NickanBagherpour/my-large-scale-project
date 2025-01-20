import React, { useState } from 'react';
import type { TablePaginationConfig } from 'antd';
import { useRouter } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { FooterContainer, ReturnButton } from '@oxygen/reusable-components';
import { RQKEYS } from '@oxygen/utils';

import { updatePagination, useAppDispatch, useAppState } from '../../context';

import { getDesktopColumns, getMobileColumns } from '../../utils/request-list.util';
import { useDeleteService } from '../../services/delete-service.api';

import * as S from './data-table.style';
import { useQueryClient } from '@tanstack/react-query';
import { Button, MarkText, Modal } from '@oxygen/ui-kit';
import { useTheme } from 'styled-components';

type DataTableProps = PageProps & {
  requestListFetching: boolean;
  requestList: any;
};

const DataTable: React.FC<DataTableProps> = (props) => {
  const dispatch = useAppDispatch();
  const { message, pagination, ...rest } = useAppState();
  const [t] = useTr();
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [serviceDetails, setServiceDetails] = useState<any>({
    serviceName: '',
    serviceId: null,
  });

  const { mutate, isPending } = useDeleteService();

  const { requestList, requestListFetching } = props;

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };

  const onCancel = () => setIsOpen(false);

  const handleApi = (serviceName: string, serviceId: number) => {
    setServiceDetails({
      serviceName: serviceName,
      serviceId: serviceId,
    });
    setIsOpen(true);
  };

  const confirmDeleteService = () => {
    mutate(serviceDetails.serviceId, {
      onSuccess: async () => {
        try {
          await queryClient.invalidateQueries({
            queryKey: [RQKEYS.BUSINESS.EDIT_REQUEST_LIST.UPDATE],
          });
          await queryClient.invalidateQueries({
            queryKey: [RQKEYS.BUSINESS.REQUEST_DETAILS.GET_REQUEST_DETAIL],
          });
        } catch (error) {
          //
        } finally {
          setIsOpen(false);
        }
      },
      onError: (error) => {
        //
      },
    });
  };

  const changePage = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      updatePagination(dispatch, {
        page: current,
        rowsPerPage: pageSize,
      });
    }
  };

  const SubmitModal = () => {
    return (
      <Modal
        open={isOpen}
        centered={true}
        title={t('delete_service')}
        onCancel={onCancel}
        confirmLoading={isPending}
        footer={[
          <Button variant={'outlined'} onClick={onCancel}>
            {t('button.cancel')}
          </Button>,
          <Button color={'error'} onClick={confirmDeleteService}>
            {t('buttons.delete')}
          </Button>,
        ]}
      >
        <MarkText
          text={t('modal_text', { service_name: serviceDetails.serviceName })}
          wordToHighlight={serviceDetails.serviceName}
          highlightColor={theme.error.main}
        ></MarkText>
      </Modal>
    );
  };

  const dataTableParams = { t, pagination, handleApi };
  const desktopColumns = getDesktopColumns(dataTableParams);
  const mobileColumns = getMobileColumns(dataTableParams);

  return (
    <S.DataTableContainer>
      {SubmitModal()}
      <S.Table
        loading={requestListFetching}
        current={pagination.page}
        total={requestList?.page?.totalElements}
        dataSource={requestList?.content}
        pagination={{ pageSize: pagination.rowsPerPage, hideOnSinglePage: true }}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        onChange={changePage}
        rowKey={(row) => row.index}
      />
      <FooterContainer>
        <ReturnButton size={'large'} variant={'outlined'} onClick={handleReturn}>
          {t('button.return')}
        </ReturnButton>
      </FooterContainer>
    </S.DataTableContainer>
  );
};

export default DataTable;
