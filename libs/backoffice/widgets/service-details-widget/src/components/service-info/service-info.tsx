import React, { useState } from 'react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import type { Pagination, Service } from '@oxygen/types';
import { TablePaginationConfig } from 'antd';
import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { getValueOrDash, ROUTES } from '@oxygen/utils';
import { Nullable } from '@oxygen/types';
import { useGetServiceDetailsQuery } from '../../services';
import { getDesktopColumns, getMobileColumns } from '../../utils/services-table.util';
import { Button, Chip, Container, InfoBox, Table, Tabs, TabsProps } from '@oxygen/ui-kit';
import { useAppDispatch, useAppState } from '../../context';
import { useGetRouteDetailsQuery } from '../../services';
import * as S from './service-info.style';

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
  const { data: serviceDetails, isFetching: isServiceFetching } = useGetServiceDetailsQuery(params);

  const state = useAppState();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [t] = useTr();
  const [pagination, setPagination] = useState<Pagination>({ page: 1, rowsPerPage: 5 });

  const [modals, setModals] = useState<Modal>({
    details: false,
    removeService: false,
  });

  const transformServiceDetails = (serviceDetails) => {
    if (!serviceDetails) return [];

    return [
      { key: t('latin_name'), value: getValueOrDash(serviceDetails?.name) },
      { key: t('persian_name'), value: getValueOrDash(serviceDetails?.persianName) },
      { key: t('access'), value: getValueOrDash(serviceDetails?.accessLevel?.title) },
      { key: t('category'), value: getValueOrDash(serviceDetails?.category?.title) },
      { key: t('throughput'), value: getValueOrDash(serviceDetails?.throughput?.title) },
      { key: t('version'), value: getValueOrDash(serviceDetails?.version) },
      { key: t('owner'), value: getValueOrDash(serviceDetails?.owner) },
      {
        key: t('tags'),
        fullwidth: true,
        value: serviceDetails.tags.length ? (
          <S.TagsContainer>
            {serviceDetails.tags.map((tag) => (
              <Chip
                className='infobox-tags'
                type='active'
                key={tag.id}
                // color='blue' // Optional: Customize color or remove for default styling
                // style={{ marginBottom: 8 }}
              >
                {tag.title}
              </Chip>
            ))}
          </S.TagsContainer>
        ) : (
          '-'
        ),
      },
    ];
  };

  const transformedData = transformServiceDetails(serviceDetails);

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
    <>
      <div className='service-technical-details'>
        <h3>{t('general_information')}</h3>
        <div className='btn-group'>
          <Button
            type={'primary'}
            color='primary'
            variant='filled'
            icon={<i className='icon-clock' />}
            onClick={() => router.push(`${ROUTES.BACKOFFICE.SERVICE_HISTORY}?id=${servicename}&type=service`)}
          >
            {t('see_changes_history')}
          </Button>
          <Button
            type={'primary'}
            color='primary'
            variant='solid'
            icon={<i className='icon-edit' />}
            onClick={() => router.push(`/edit-service?id=1111111`)}
          >
            {t('edit')}
          </Button>
        </div>
      </div>

      {/* {console.log(serviceDetails, 'service details')} */}

      <InfoBox data={transformedData} margin={0} loading={isServiceFetching} />
    </>
  );
};

export default Route;
