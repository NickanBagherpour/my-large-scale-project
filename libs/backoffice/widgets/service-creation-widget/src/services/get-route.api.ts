import { useQuery } from '@tanstack/react-query';
import Api from './api';
import { RQKEYS } from '@oxygen/utils';
import { useIs404 } from '../utils/use-is-404';
import { useSearchParams } from 'next/navigation';

export const useGetRoute = () => {
  const serviceName = useSearchParams().get('service-name');
  const { error, ...rest } = useQuery({
    queryKey: [RQKEYS.SERVICE_CREATION.ROUTE, serviceName],
    enabled: !!serviceName,
    queryFn: () => Api.getRoute(serviceName!),
  });
  const is404Error = useIs404(error);
  return { ...rest, error, is404Error };
};
