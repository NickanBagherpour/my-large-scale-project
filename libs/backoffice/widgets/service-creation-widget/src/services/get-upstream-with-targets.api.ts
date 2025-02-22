import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

const { UPSTREAM, SERVICE_CREATION } = RQKEYS.BACKOFFICE;

export const useGetUpstreamWithTargets = (name: string | null) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [UPSTREAM, SERVICE_CREATION.UPSTREAM_WITH_NAME, name],
    queryFn: withErrorHandling(() => Api.getUpstreamWithTargets(name!), dispatch),
    enabled: !!name,
    placeholderData: keepPreviousData,
  });
};
