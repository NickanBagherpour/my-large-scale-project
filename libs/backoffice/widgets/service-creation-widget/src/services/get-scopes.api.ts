import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { Pagination } from '@oxygen/types';

export const useGetScopes = (pagination: Pagination) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.SERVICE_CREATION.GET_SCOPES, pagination],
    queryFn: withErrorHandling(() => Api.getScopes(pagination), dispatch),
    placeholderData: keepPreviousData,
  });
};
