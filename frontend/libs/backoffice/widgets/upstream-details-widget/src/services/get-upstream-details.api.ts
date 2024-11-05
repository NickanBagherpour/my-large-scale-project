import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { ParamsType } from '../types';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetUpstreamDetailsQuery = (params: ParamsType) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.UPSTREAM_DETAILS.GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getUpstreamDetailsList(params), dispatch),
    placeholderData: keepPreviousData,
  });
};
