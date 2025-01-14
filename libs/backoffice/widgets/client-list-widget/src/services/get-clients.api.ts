import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { ParamsType } from '@oxygen/types';

export const useGetClientsQuery = (params: ParamsType) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.CLIENTS_LIST.GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getClientsListData(params), dispatch),
    placeholderData: keepPreviousData,
  });
};
