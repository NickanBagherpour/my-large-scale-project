import { RQKEYS } from '@oxygen/utils';

import { useAppDispatch } from '../context';
import { ClientHistoryResponseType, FetchClientHistoryParamsType } from '../types';
import { useChangeHistoryQuery } from '@oxygen/hooks';

const {
  CLIENT,
  CLIENT_HISTORY: { GET_LIST },
} = RQKEYS.BACKOFFICE;

export const useGetClientHistoryQuery = (params: FetchClientHistoryParamsType) => {
  const { clientName, page, size } = params;

  const dispatch = useAppDispatch();

  return useChangeHistoryQuery<ClientHistoryResponseType>({
    queryKey: [CLIENT, GET_LIST],
    url: `/v1/clients/history/${clientName}`,
    dispatch,
    nestedKeyAccessor: 'clientInfoHistoryItemDtos',
    params: {
      page,
      size,
    },
  });
};
