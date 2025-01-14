import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import Api from '../api';
import { useAppDispatch } from '../../context';

export const useGetServicesQuery = (params) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.CLIENT_DETAILS.SERVICES, params],
    queryFn: withErrorHandling(() => Api.getScopeServicesData(params), dispatch),
    placeholderData: keepPreviousData,
  });
};
