import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetDraftsQuery = () => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.SERVICES_LIST.DRAFTS],
    queryFn: withErrorHandling(() => Api.getDraftsData(), dispatch),
    placeholderData: keepPreviousData,
  });
};
