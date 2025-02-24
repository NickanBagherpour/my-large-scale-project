import { RQKEYS } from '@oxygen/utils';

import { useAppDispatch } from '../context';
import { useChangeHistoryQuery } from '@oxygen/hooks';
import { ServiceDocumentationHistory } from '../types';

const { SERVICE, DOCUMENTATION_HISTORY } = RQKEYS.BACKOFFICE;

export const useGetServiceDocumentationHistory = (params: { page: number; size: number; upstreamName: string }) => {
  const { page, size, upstreamName } = params;
  const dispatch = useAppDispatch();

  return useChangeHistoryQuery<ServiceDocumentationHistory>({
    queryKey: [SERVICE, DOCUMENTATION_HISTORY.GET_LIST],
    url: `/v1/upstreams/${upstreamName}/history`,
    dispatch,
    params: {
      page,
      size,
    },
  });
};
