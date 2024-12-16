import React, { useState } from 'react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import type { Pagination, Service } from '@oxygen/types';
import { TablePaginationConfig } from 'antd';
import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { ROUTES } from '@oxygen/utils';
import { Nullable } from '@oxygen/types';

import { getDesktopColumns, getMobileColumns } from '../../utils/services-table.util';
import { Button, Container, InfoBox, Table, Tabs, TabsProps } from '@oxygen/ui-kit';
import { useAppDispatch, useAppState } from '../../context';
import { useGetRouteDetailsQuery } from '../../services';
import * as S from './route.style';

export type Modal = {
  details: boolean;
  removeService: boolean;
};

type Props = {
  t: (key: string) => string; // Assuming 't' is a function for translations
  filteredClients: Service[];
  pagination: { page: number; rowsPerPage: number };
  isClientsFetching: boolean;
  handlePageChange: (pagination: TablePaginationConfig) => void;
};

type AppProps = PageProps & {
  //
};

const Route: React.FC<AppProps> = (props) => {
  const { data: routeDetails, isFetching: isServiceFetching } = useGetRouteDetailsQuery();

  const state = useAppState();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [t] = useTr();
  const [pagination, setPagination] = useState<Pagination>({ page: 1, rowsPerPage: 5 });

  const [modals, setModals] = useState<Modal>({
    details: false,
    removeService: false,
  });

  const id: Nullable<string> = searchParams.get('id');
  if (!id) {
    redirect('/not-found');
  }

  const toggleModal = (modal: keyof Modal) => {
    setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };

  const handlePageChange = (pagination: any) => {
    setPagination({
      page: pagination.current,
      rowsPerPage: pagination.pageSize,
    });
  };

  const desktopColumns = getDesktopColumns({ t, toggleModal });
  const mobileColumns = getMobileColumns({ t, toggleModal });

  return (
    <S.ItemsContainer className='clients-list'>
      <div className='service-technical-details'>
        <h3>{t('service_technical_info')}</h3>
        <div className='btn-group'>
          <Button
            type={'primary'}
            color='primary'
            variant='filled'
            icon={<i className='icon-clock' />}
            onClick={() => router.push(`${ROUTES.BACKOFFICE.ROUTE_HISTORY}?id=${id}`)}
          >
            {t('see_changes_history')}
          </Button>
          <Button
            type={'primary'}
            color='primary'
            variant='solid'
            icon={<i className='icon-edit' />}
            onClick={() => router.push(`${ROUTES.BACKOFFICE.EDIT_ROUTE}?id=${id}`)}
          >
            {t('edit')}
          </Button>
        </div>
      </div>
      <InfoBox data={routeDetails} margin={0} loading={isServiceFetching} />{' '}
    </S.ItemsContainer>
  );
};

export default Route;
