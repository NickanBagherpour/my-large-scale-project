import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { ClientReportDto, ParamsType } from '../types';
import { useAppDispatch } from '../context';
import Api from './api';
const businesseKey = RQKEYS.BUSINESS;
export const useGetClientServicesQuery = (client: ClientReportDto) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [businesseKey.CLIENT_SERVICES, client],
    queryFn: withErrorHandling(() => Api.getClientServicesList(client), dispatch),
    placeholderData: keepPreviousData,
  });
};
