import { RQKEYS } from '@oxygen/utils';

import Api from './api';
import { useAppDispatch } from '../context';
import { FetchClientHistoryParamsType } from '../types';
import { useChangeHistoryQuery } from '@oxygen/hooks';

const {
  CLIENT,
  CLIENT_HISTORY: { GET_LIST },
} = RQKEYS.BACKOFFICE;

export const useGetClientHistoryQuery = (params: FetchClientHistoryParamsType) => {
  const { clientName, page, size } = params;

  const dispatch = useAppDispatch();

  return useChangeHistoryQuery<any>({
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
