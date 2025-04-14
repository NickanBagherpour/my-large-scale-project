import { RQKEYS } from '@oxygen/utils';
import { useChangeHistoryQuery } from '@oxygen/hooks';
import { API_PREFIX } from '@oxygen/client';

import { useAppDispatch } from '../context';

export const useGetsServiceHistoryDataQuery = (params) => {
  const { serviceId, page, size } = params;
  const dispatch = useAppDispatch();

  return useChangeHistoryQuery({
    queryKey: [RQKEYS.BACKOFFICE.SERVICE_HISTORY.GET_LIST],
    url: `${API_PREFIX.PUBLISHER}/v1/routes/${serviceId}/history`,
    dispatch,
    params: {
      page,
      size,
    },
  });
};
