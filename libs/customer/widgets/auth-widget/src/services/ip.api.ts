import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import Api from './api';
// import { FetchParamsType } from '../types';
import { useAppDispatch } from '../context';

export const useGetIpQuery = (params) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.CUSOMTER_AUTH.IP, params],
    queryFn: () => Api.getIP(params),
  });
};
