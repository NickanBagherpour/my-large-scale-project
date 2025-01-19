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
import { Button, Chip, InfoBox } from '@oxygen/ui-kit';
import * as S from './service-info.style';

export type Modal = {
  details: boolean;
  removeService: boolean;
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

  const router = useRouter();

  const [t] = useTr();

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
                ellipsis={true}
                key={tag.id}
                tooltipTitle={tag.title}
                tooltipOnEllipsis={true}
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
            onClick={() => router.push(`${ROUTES.BACKOFFICE.SERVICE_HISTORY}?id=${serviceDetails?.serviceInfoId}`)}
          >
            {t('see_changes_history')}
          </Button>
          <Button
            type={'primary'}
            color='primary'
            variant='solid'
            icon={<i className='icon-edit' />}
            onClick={() => router.push(ROUTES.BACKOFFICE.EDIT_SERVICE + `?service-name=${serviceDetails.name}`)}
          >
            {t('edit')}
          </Button>
        </div>
      </div>

      <InfoBox data={transformedData} margin={0} loading={isServiceFetching} />
    </>
  );
};

export default Route;
