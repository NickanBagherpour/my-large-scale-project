import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import Api from '../services/api';
import { type ClientServicesParams } from './services.type';
import { type Dispatch } from 'react';

const { CLIENT_DETAILS, SERVICE } = RQKEYS.BACKOFFICE;

export const getClientServicesKeys = () => [SERVICE, CLIENT_DETAILS.CLIENT_SERVICES];

export const useGetClientServices = (params: ClientServicesParams, dispatch: Dispatch<any>) => {
  return useQuery({
    queryKey: [...getClientServicesKeys(), params],
    queryFn: withErrorHandling(() => Api.getClientServices(params), dispatch),
    placeholderData: keepPreviousData,
  });
};
