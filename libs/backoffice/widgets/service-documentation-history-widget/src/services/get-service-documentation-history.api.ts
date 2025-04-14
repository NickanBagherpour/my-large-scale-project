import { RQKEYS } from '@oxygen/utils';
import { useChangeHistoryQuery } from '@oxygen/hooks';
import { API_PREFIX } from '@oxygen/client';

import { useAppDispatch } from '../context';
import { ServiceDocumentationHistory } from '../types';

const { SERVICE, DOCUMENTATION_HISTORY } = RQKEYS.BACKOFFICE;

export const useGetServiceDocumentationHistory = (params: { page: number; size: number; serviceName: string }) => {
  const { page, size, serviceName } = params;
  const dispatch = useAppDispatch();

  return useChangeHistoryQuery<ServiceDocumentationHistory>({
    queryKey: [SERVICE, DOCUMENTATION_HISTORY.GET_LIST],
    url: `${API_PREFIX.PUBLISHER}/v1/services/${serviceName}/files/history`,
    dispatch,
    params: {
      page,
      size,
      sortBy: 'timestamp',
    },
  });
};
