import { useQuery } from '@tanstack/react-query';
import Api from './api';
import { useIs404 } from '../utils/use-is-404';
import { RQKEYS } from '@oxygen/utils';
import { useAppState } from '../context';

export const useGetScope = () => {
  const { serviceName } = useAppState();
  const { error, ...rest } = useQuery({
    queryKey: [RQKEYS.SERVICE_CREATION.SCOPE, serviceName],
    enabled: !!serviceName,
    queryFn: () => Api.getScope(serviceName),
  });
  const is404Error = useIs404(error);
  return { ...rest, error, is404Error };
};
