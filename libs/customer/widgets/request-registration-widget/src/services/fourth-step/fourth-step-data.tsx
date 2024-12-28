import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../../context';
import Api from '../api';

export const useGetRequestQuery = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.SERVICES_LIST.GET_LIST],
    queryFn: withErrorHandling(() => Api.getRequestData(), dispatch),
    placeholderData: keepPreviousData,
  });
};

export const useGetRequestDataQuery = (submissionId: number) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.REQUEST_REGISTRATION.GET_REQUEST_DATA],
    queryFn: withErrorHandling(() => Api.geRequestData(submissionId), dispatch),
    placeholderData: keepPreviousData,
  });
};
