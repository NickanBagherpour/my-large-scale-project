import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetRequestDataQuery = (submissionId: string) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.CUSTOMER.REQUEST_REGISTRATION.GET_REQUEST_DATA],
    queryFn: withErrorHandling(() => Api.geRequestData(submissionId), dispatch),
    placeholderData: keepPreviousData,
    refetchOnMount: true,
    staleTime: 0,
  });
};
