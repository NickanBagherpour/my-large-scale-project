import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetUpstreamWithTargets = (id: number | null) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.SERVICE_CREATION.UPSTREAM_WITH_ID, id],
    queryFn: withErrorHandling(() => Api.getUpstreamWithTargets(id!), dispatch),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
};
