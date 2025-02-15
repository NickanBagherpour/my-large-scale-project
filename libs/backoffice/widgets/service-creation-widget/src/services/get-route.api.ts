import { useQuery } from '@tanstack/react-query';
import Api from './api';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch, useAppState } from '../context';
import { type Route } from '../types';
// import { getId } from '../utils/get-id';

export const useGetRoute = () => {
  const { serviceName } = useAppState();
  const dispatch = useAppDispatch();

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
          paths: data.route.paths.map((p) => ({ code: 1 /* getId() */, title: p })),
          hosts: data.route.hosts.map((p) => ({ code: 2 /* getId() */, title: p })),
        },
      };
    },
  });
};
