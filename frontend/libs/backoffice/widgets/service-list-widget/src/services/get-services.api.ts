import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { ParamsType } from '../types';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetServicesQuery = (params: ParamsType) => {
  // debugger;
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.SERVICES_LIST.GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getServicesList(params), dispatch),
    placeholderData: keepPreviousData,
  });
};
