import { useQuery } from '@tanstack/react-query';
import Api from './api';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch, useAppState } from '../context';

export const useGetScope = () => {
  const { serviceName } = useAppState();
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.SERVICE_CREATION.SCOPE, serviceName],
    enabled: !!serviceName,
    queryFn: withErrorHandling(() => Api.getScope(serviceName), dispatch, { ignore404Errors: true }),
  });
};
