import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { ParamsWithPagination } from '../types';

export const useGetDraftsQuery = (params: ParamsWithPagination) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.CLIENTS_LIST.DRAFTS, params],
    queryFn: withErrorHandling(() => Api.getDraftsData(params), dispatch),
    placeholderData: keepPreviousData,
  });
};
