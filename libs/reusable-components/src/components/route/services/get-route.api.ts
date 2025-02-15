import { useQuery } from '@tanstack/react-query';
import Api from './api';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { type Route } from '../type/route.type';
import { getId } from '../utils/get-id';
import { type Dispatch } from 'react';

type Props = {
  dispatch: Dispatch<any>;
  serviceName: string;
};

export const useGetRoute = (props: Props) => {
  const { dispatch, serviceName } = props;

  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.SERVICE_CREATION.ROUTE, serviceName],
    enabled: !!serviceName,
    queryFn: withErrorHandling(() => Api.getRoute(serviceName), dispatch, { ignore404Errors: true }),
    select: (data: Route) => {
      return {
        ...data,
        route: {
          ...data.route,
          // TODO: find a better way and remove these:
          paths: data.route.paths.map((p) => ({ code: getId(), title: p })),
          hosts: data.route.hosts.map((p) => ({ code: getId(), title: p })),
        },
      };
    },
  });
};
