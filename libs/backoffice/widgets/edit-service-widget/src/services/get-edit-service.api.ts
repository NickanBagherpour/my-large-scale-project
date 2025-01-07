import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useQuery } from '@tanstack/react-query';

import Api from './api';
import { useAppDispatch } from '../context';

export const useGetServiceInfoQuery = (serviceName: string) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.EDIT_SERVICE.GET_DETAIL, serviceName],
    queryFn: withErrorHandling(() => Api.getServiceInfo(serviceName), dispatch),
  });
};
