import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../../context';
import Api from '../api';

export const useClientDraftInfoQuery = (params: string) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.CLIENT_CREATION.CLIENT_DRAFT_INFO, params],
    queryFn: withErrorHandling(() => Api.getClientDraftInfo(params), dispatch),
    enabled: false,
  });
};
