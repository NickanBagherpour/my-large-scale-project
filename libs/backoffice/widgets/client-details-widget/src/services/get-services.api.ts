import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { ServiceParams } from '../types/services.type';

export const useGetServices = (params: ServiceParams) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.CLIENT_DETAILS.SERVICES, params],
    queryFn: withErrorHandling(() => Api.getServices(params), dispatch),
    placeholderData: keepPreviousData,
  });
};
