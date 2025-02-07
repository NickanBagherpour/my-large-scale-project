import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { DraftsParams } from '../types/services.type';
const backofficeKey = RQKEYS.BACKOFFICE;
export const useGetDraftsQuery = (params: DraftsParams) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [backofficeKey.SERVICE, backofficeKey.SERVICES_LIST.DRAFTS, params],
    queryFn: withErrorHandling(() => Api.getDraftsData(params), dispatch),
    placeholderData: keepPreviousData,
  });
};
