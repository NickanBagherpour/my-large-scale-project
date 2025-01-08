import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetRequestListQuery = (params) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.REQUEST_LIST.REQUEST_MANAGEMENT, params],
    queryFn: withErrorHandling(() => Api.getRequestList(params), dispatch),
    networkMode: 'offlineFirst',
  });
};
