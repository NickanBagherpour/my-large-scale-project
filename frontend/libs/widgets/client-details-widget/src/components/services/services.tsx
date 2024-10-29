import { useTr } from '@oxygen/translation';
import { Button, ColumnsType, Input, Switch, Table } from '@oxygen/ui-kit';
import * as S from './services.style';
import Link from 'next/link';
import RemoveServiceModal from '../remove-service-modal/remove-service-modal';
import { useToggle } from '@oxygen/hooks';
import DetailsModal from '../details-modal/details-modal';
import StartServiceModal from '../start-service-modal/start-service-modal';
import StopServiceModal from '../stop-service-modal/stop-service-modal';
import { useState } from 'react';
import { useGetServicesQuery } from '../../services';
import { type TablePaginationConfig } from 'antd';
import type { Pagination, Service } from '@oxygen/types';

export default function Services() {
  const [t] = useTr();
  const [isRemoveModalOpen, toggleIsRemoveModalOpen] = useToggle(false);
  const [isDetailsModalOpen, toggleIsDetailsModalOpen] = useToggle(false);
  const [isStopModalOpen, toggleIsStopModalOpen] = useToggle(false);
  const [isStartModalOpen, toggleIsStartModalOpen] = useToggle(false);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, rowsPerPage: 5 });

  const { data, isFetching } = useGetServicesQuery(pagination);

  const changePage = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      setPagination({
        page: pageSize === pagination.rowsPerPage ? current : 1,
        rowsPerPage: pageSize,
      });
    }
  };

  const columns: ColumnsType<Service> = [
    {
      title: t('service_name'),
      dataIndex: 'serviceName',
      key: 'serviceName',
      align: 'center',
    },
    {
      title: t('persian_name'),
      dataIndex: 'persianName',
      key: 'persianName',
      align: 'center',
    },
    {
      title: t('scope'),
      dataIndex: 'scope',
      key: 'scope',
      align: 'center',
    },
    {
      title: t('url'),
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      render: (url) => <Link href={url}>{url}</Link>,
    },
    {
      title: t('version'),
      dataIndex: 'version',
      key: 'version',
      align: 'center',
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: () => (
        <S.Status>
          <S.StatusTxt>{t('operational')}</S.StatusTxt>
          <Switch
            onChange={(checked) => {
              checked ? toggleIsStopModalOpen() : toggleIsStartModalOpen();
            }}
          />
          <S.StatusTxt>{t('stop')}</S.StatusTxt>
        </S.Status>
      ),
    },
    {
      title: '',
      dataIndex: 'details',
      key: 'details',
      render: () => (
        <Button variant='text' color='primary' onClick={toggleIsDetailsModalOpen}>
          {t('details')}
        </Button>
      ),
    },
    {
      title: '',
      dataIndex: 'remove',
      key: 'remove',
      render: () => (
        <Button variant='text' color='error' onClick={toggleIsRemoveModalOpen}>
          <S.TrashIcon className='icon-trash' />
        </Button>
      ),
    },
  ];

  return (
    <>
      <S.Header>
        <S.Title>{t('client_services')}</S.Title>
        <Input size='large' placeholder={t('searchByNames')} prefix={<i className='icon-search-normal' />} />
      </S.Header>

      <Table
        loading={isFetching}
        current={pagination.page}
        total={data?.total}
        dataSource={data?.list}
        pagination={{ pageSize: pagination.rowsPerPage }}
        columns={columns}
        onChange={changePage}
      />

      <StopServiceModal isOpen={isStopModalOpen} toggle={toggleIsStopModalOpen} id={'samat-lc-gutr-del'} />
      <StartServiceModal isOpen={isStartModalOpen} toggle={toggleIsStartModalOpen} id={'samat-lc-gutr-del'} />
      <RemoveServiceModal isOpen={isRemoveModalOpen} toggle={toggleIsRemoveModalOpen} id={'samat-lc-gutr-del'} />
      <DetailsModal isOpen={isDetailsModalOpen} toggle={toggleIsDetailsModalOpen} />
    </>
  );
}
