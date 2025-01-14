import { useQuery } from '@tanstack/react-query';
import Api from './api';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch, useAppState } from '../context';

export const useGetService = () => {
  const { serviceName } = useAppState();
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.SERVICE_CREATION.SERVICE, serviceName],
    enabled: !!serviceName,
    queryFn: withErrorHandling(() => Api.getService(serviceName), dispatch, { ignore404Errors: true }),
  });
};
