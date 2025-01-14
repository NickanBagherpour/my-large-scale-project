import { useQuery } from '@tanstack/react-query';

import { RQKEYS } from '@oxygen/utils';

import Api from './api';

export const useGetIpQuery = (params) => {
  return useQuery({
    queryKey: [RQKEYS.CUSTOMER.AUTH.IP, params],
    queryFn: () => Api.getIP(params),
  });
};
