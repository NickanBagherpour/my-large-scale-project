import React, { useState } from 'react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import type { Pagination, Service } from '@oxygen/types';
import { TablePaginationConfig } from 'antd';
import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { ROUTES } from '@oxygen/utils';
import { Nullable } from '@oxygen/types';
import { getValueOrDash } from '@oxygen/utils';
import { getDesktopColumns, getMobileColumns } from '../../utils/services-table.util';
import { Button, Container, InfoBox, Table, Tabs, TabsProps } from '@oxygen/ui-kit';
import { useAppDispatch, useAppState } from '../../context';
import { useGetRouteDetailsQuery } from '../../services';
import * as S from './route-info.style';

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
  const searchParams = useSearchParams();
  const servicename: Nullable<string> = searchParams.get('servicename');
  if (!servicename) {
    redirect('/not-found');
  }

  const params = servicename;
  const { data: routeDetails, isFetching: isServiceFetching } = useGetRouteDetailsQuery(params);

  const state = useAppState();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [t] = useTr();
  const [pagination, setPagination] = useState<Pagination>({ page: 1, rowsPerPage: 5 });

  const transformServiceDetails = (routeDetails) => {
    if (!routeDetails) return [];

    return [
      { key: t('action_method'), value: getValueOrDash(routeDetails.method) },
      { key: t('protocol'), value: getValueOrDash(routeDetails.protocol) },
      { key: t('path'), value: getValueOrDash(routeDetails.path) },
      { key: t('host'), value: getValueOrDash(routeDetails.host) },
      // {
      //   key: 'tags',
      //   value: serviceDetails.tags.length
      //     ? serviceDetails.tags.map(
      //         (tag, index) => `<Chip type='active'>
      //         {tag}
      //       </Chip>`
      //       )
      //     : '-',
      // },
    ];
  };

  const transformedData = transformServiceDetails(routeDetails);

  const [modals, setModals] = useState<Modal>({
    details: false,
    removeService: false,
  });

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
            onClick={() => router.push(`${ROUTES.BACKOFFICE.ROUTE_HISTORY}?servicename=${servicename}`)}
          >
            {t('see_changes_history')}
          </Button>
          <Button
            type={'primary'}
            color='primary'
            variant='solid'
            icon={<i className='icon-edit' />}
            onClick={() => router.push(`${ROUTES.BACKOFFICE.EDIT_ROUTE}?servicename=${servicename}`)}
          >
            {t('edit')}
          </Button>
        </div>
      </div>
      <InfoBox data={transformedData} margin={0} loading={isServiceFetching} />{' '}
    </S.ItemsContainer>
  );
};

export default Route;
