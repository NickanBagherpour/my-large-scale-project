import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import Api from './api';
import { ServiceParams } from './services.type';
import { type Dispatch } from 'react';

const { CLIENT_DETAILS, SERVICE } = RQKEYS.BACKOFFICE;

export const useGetServices = (params: ServiceParams, dispatch: Dispatch<any>) => {
  return useQuery({
    queryKey: [SERVICE, CLIENT_DETAILS.SERVICES, params],
    queryFn: withErrorHandling(() => Api.getServices(params), dispatch),
    placeholderData: keepPreviousData,
  });
};
