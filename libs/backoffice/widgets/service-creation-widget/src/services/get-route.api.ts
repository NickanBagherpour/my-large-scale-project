import { useQuery } from '@tanstack/react-query';
import Api from './api';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch, useAppState } from '../context';

export const useGetRoute = () => {
  const { serviceName } = useAppState();
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.SERVICE_CREATION.ROUTE, serviceName],
    enabled: !!serviceName,
    queryFn: withErrorHandling(() => Api.getRoute(serviceName), dispatch, { ignore404Errors: true }),
  });
};
