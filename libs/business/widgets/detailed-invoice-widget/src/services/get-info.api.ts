import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { InfoParams } from '../types';

export const useGetInfoQuery = (params: InfoParams) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BUSINESS.DETAILED_INVOICE.INFO, params],
    queryFn: withErrorHandling(() => Api.getInfo(params), dispatch),
    enabled: !!params.id && !!params['client-type'],
  });
};
