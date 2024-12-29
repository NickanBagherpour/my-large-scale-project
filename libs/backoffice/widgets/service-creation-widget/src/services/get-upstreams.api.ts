import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { UpstreamsParams } from '../types';

export const useGetUpstreams = (params: UpstreamsParams) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.SERVICE_CREATION.UPSTREAMS, params],
    queryFn: withErrorHandling(() => Api.getUpstreams(params), dispatch),
    placeholderData: keepPreviousData,
  });
};
