import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import type { Pagination } from '@oxygen/types';

export const useGetServicesQuery = (params: Pagination) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.CLIENT_DETAILS.SERVICES, params],
    queryFn: withErrorHandling(() => Api.getServicesData(params), dispatch),
    placeholderData: keepPreviousData,
  });
};
