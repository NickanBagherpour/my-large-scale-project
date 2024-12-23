import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Api from './api';
import { FetchRequestedServicesParamsType } from '../types';

export const useGetRequestedServicesQuery = (params: FetchRequestedServicesParamsType) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.REQUEST_DETAILS.GET_REQUESTED_SERVICES, params],
    queryFn: withErrorHandling(() => Api.getRequestedServices(params), dispatch),
    placeholderData: keepPreviousData,
    networkMode: 'offlineFirst',
  });
};
