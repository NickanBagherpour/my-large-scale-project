import { useQuery } from '@tanstack/react-query';

import { RQKEYS } from '@oxygen/utils';

import Api from './api';
import { useAppDispatch } from '../context';

export const useGetIpQuery = (params) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.CUSTOMER_AUTH.IP, params],
    queryFn: () => Api.getIP(params),
  });
};
