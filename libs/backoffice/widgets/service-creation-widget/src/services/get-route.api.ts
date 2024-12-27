import { useQuery } from '@tanstack/react-query';
import Api from './api';
import { RQKEYS } from '@oxygen/utils';
import { useIs404 } from '../utils/use-is-404';
import { useAppState } from '../context';

export const useGetRoute = () => {
  const { serviceName } = useAppState();
  const { error, data, ...rest } = useQuery({
    queryKey: [RQKEYS.SERVICE_CREATION.ROUTE, serviceName],
    enabled: !!serviceName,
    queryFn: () => Api.getRoute(serviceName),
  });
  const is404Error = useIs404(error);
  return { ...rest, error, is404Error, data: data?.data };
};
