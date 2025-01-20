import React from 'react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { ROUTES } from '@oxygen/utils';
import { Nullable } from '@oxygen/types';
import { getValueOrDash } from '@oxygen/utils';
import { Button, InfoBox } from '@oxygen/ui-kit';

import { useGetRouteDetailsQuery } from '../../services';

import * as S from './route-info.style';

export type Modal = {
  details: boolean;
  removeService: boolean;
};

type AppProps = PageProps & {
  //
};

const Route: React.FC<AppProps> = () => {
  const searchParams = useSearchParams();
  const servicename: Nullable<string> = searchParams.get('servicename');
  if (!servicename) {
    redirect('/not-found');
  }

  const params = servicename;
  const { data: routeDetails, isFetching: isServiceFetching } = useGetRouteDetailsQuery(params);
  const router = useRouter();

  const [t] = useTr();

  const transformServiceDetails = (routeDetails) => {
    if (!routeDetails) return [];

    return [
      { key: t('action_method'), value: getValueOrDash(routeDetails.method?.title) },
      { key: t('protocol'), value: getValueOrDash(routeDetails.protocol?.title) },
      { key: t('path'), value: getValueOrDash(routeDetails.path) },
      { key: t('host'), value: getValueOrDash(routeDetails.host) },
    ];
  };

  const transformedData = transformServiceDetails(routeDetails);

  return (
    <S.ItemsContainer className='clients-list'>
      <div className='service-technical-details'>
        <h3>{t('route')}</h3>
        <div className='btn-group'>
          <Button
            type={'primary'}
            color='primary'
            variant='filled'
            icon={<i className='icon-clock' />}
            onClick={() => router.push(`${ROUTES.BACKOFFICE.ROUTE_HISTORY}?serviceId=${routeDetails?.id}`)}
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
