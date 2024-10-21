import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { ParamsType } from '../types';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetClientsQuery = (params: ParamsType) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.CLIENTS_LIST.GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getClientsListData(params), dispatch),
  });
};
