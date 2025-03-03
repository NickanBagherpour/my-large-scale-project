import React from 'react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { ROUTES } from '@oxygen/utils';
import { Nullable } from '@oxygen/types';
import { Button } from '@oxygen/ui-kit';

import { useGetRouteDetailsQuery } from '../../services';

import { RouteInfoBox } from '@oxygen/reusable-components';
import { CaptionWrapper } from '../app/app.style';

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

  let route = {
    methods: [] as string[],
    protocols: [] as string[],
    hosts: [] as string[],
    paths: [] as string[],
  };

  if (routeDetails) {
    const {
      route: { protocols, hosts, paths, methods },
    } = routeDetails;
    route = {
      methods: methods.map((item) => item.title),
      protocols: protocols.map((item) => item.title),
      paths,
      hosts,
    };
  }

  const [t] = useTr();

  return (
    <>
      <CaptionWrapper>
        <p>{t('route')}</p>
        <div className='btn-group'>
          <Button
            type={'primary'}
            color='primary'
            variant='filled'
            icon={<i className='icon-clock' />}
            onClick={() => router.push(`${ROUTES.BACKOFFICE.ROUTE_HISTORY}?serviceId=${routeDetails?.route?.id}`)}
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
      </CaptionWrapper>
      <RouteInfoBox route={route} isLoading={isServiceFetching} />
    </>
  );
};

export default Route;
