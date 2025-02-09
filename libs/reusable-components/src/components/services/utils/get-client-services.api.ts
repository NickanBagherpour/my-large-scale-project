import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import Api from './api';
import { type ClientServicesParams } from './services.type';
import { type Dispatch } from 'react';

const { CLIENT_SERVICES } = RQKEYS.BACKOFFICE.CLIENT_DETAILS;

export const useGetClientServices = (params: ClientServicesParams & { dispatch: Dispatch<any> }) => {
  const { dispatch, ...restOfParams } = params;
  return useQuery({
    queryKey: [CLIENT_SERVICES, restOfParams],
    queryFn: withErrorHandling(() => Api.getClientServices(restOfParams), dispatch),
    placeholderData: keepPreviousData,
  });
};
