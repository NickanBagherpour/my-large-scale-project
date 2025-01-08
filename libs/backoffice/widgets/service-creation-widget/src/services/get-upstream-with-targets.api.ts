import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetUpstreamWithTargets = (name: string | null) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.SERVICE_CREATION.UPSTREAM_WITH_NAME, name],
    queryFn: withErrorHandling(() => Api.getUpstreamWithTargets(name!), dispatch),
    enabled: !!name,
    placeholderData: keepPreviousData,
  });
};
