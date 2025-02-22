import { RQKEYS } from '@oxygen/utils';

import { useAppDispatch } from '../context';

import { useChangeHistoryQuery } from '@oxygen/hooks';
import { GetClientParamsType } from '../types/common-types';

export const useGetsClientHistoryDataQuery = (params: GetClientParamsType) => {
  const { clientName, page, size } = params;
  const dispatch = useAppDispatch();

  return useChangeHistoryQuery({
    queryKey: [RQKEYS.BACKOFFICE.CLIENT_HISTORY.GET_LIST],
    url: `/v1/clients/services-history/${clientName}`,
    dispatch,
    nestedKeyAccessor: 'clientServiceHistoryItemDtos',
    params: {
      page,
      size,
    },
  });
};
