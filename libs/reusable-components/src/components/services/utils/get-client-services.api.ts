import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import Api from './api';
import { type ClientServicesParams } from './services.type';

const { CLIENT_SERVICES } = RQKEYS.BACKOFFICE.CLIENT_DETAILS;

export const useGetClientServices = (params: ClientServicesParams) => {
  // const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [CLIENT_SERVICES, params],
    queryFn: withErrorHandling(() => Api.getClientServices(params) /* dispatch */),
    placeholderData: keepPreviousData,
  });
};
