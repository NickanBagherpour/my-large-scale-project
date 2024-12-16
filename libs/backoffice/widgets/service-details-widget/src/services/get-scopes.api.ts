import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { Pagination } from '@oxygen/types';

export const useGetScopes = (params: { pagination: Pagination; name: string }) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.SERVICE_CREATION.GET_SCOPES, params],
    queryFn: withErrorHandling(() => Api.getScopes(params), dispatch),
    placeholderData: keepPreviousData,
  });
};
