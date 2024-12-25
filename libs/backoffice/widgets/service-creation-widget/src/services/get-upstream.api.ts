import { useQuery } from '@tanstack/react-query';
import Api from './api';
import { useSearchParams } from 'next/navigation';
import { useIs404 } from '../utils/use-is-404';
import { RQKEYS } from '@oxygen/utils';

export const useGetUpstream = () => {
  const serviceName = useSearchParams().get('service-name');
  const { error, ...rest } = useQuery({
    queryKey: [RQKEYS.SERVICE_CREATION.UPSTREAM, serviceName],
    enabled: !!serviceName,
    queryFn: () => Api.getUpstream(serviceName!),
  });
  const is404Error = useIs404(error);
  return { ...rest, error, is404Error };
};
