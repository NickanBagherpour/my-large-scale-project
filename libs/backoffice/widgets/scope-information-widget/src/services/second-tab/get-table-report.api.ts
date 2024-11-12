import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import type { Pagination } from '@oxygen/types';
import Api from '../api';
import { useAppDispatch } from '../../context';

export const useGetServicesQuery = (params) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.CLIENT_DETAILS.SERVICES, params],
    queryFn: withErrorHandling(() => Api.getServicesData(params), dispatch),
    placeholderData: keepPreviousData,
  });
};
