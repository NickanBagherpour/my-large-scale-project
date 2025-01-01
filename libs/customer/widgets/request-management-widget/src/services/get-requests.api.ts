import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { RequestParamsType } from '@oxygen/types';

export const useGetRequestsQuery = (params: RequestParamsType) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.CLIENTS_LIST.GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getRequestsListData(params), dispatch),
    placeholderData: keepPreviousData,
  });
};
