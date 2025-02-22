import { RQKEYS } from '@oxygen/utils';

import { useAppDispatch } from '../context';

import { useChangeHistoryQuery } from '@oxygen/hooks';

export const useGetsServiceHistoryDataQuery = (params) => {
  const { serviceId, page, size } = params;
  const dispatch = useAppDispatch();

  return useChangeHistoryQuery({
    queryKey: [RQKEYS.BACKOFFICE.SERVICE_HISTORY.GET_LIST],
    url: `/v1/routes/${serviceId}/history`,
    dispatch,
    params: {
      page,
      size,
    },
  });
};
