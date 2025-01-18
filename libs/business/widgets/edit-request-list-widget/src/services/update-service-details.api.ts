import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useUpdateServiceDetails = (params) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BUSINESS.EDIT_REQUEST_LIST.UPDATE, params],
    queryFn: withErrorHandling(() => Api.updateServiceDetails(params), dispatch),
    networkMode: 'offlineFirst',
  });
};
