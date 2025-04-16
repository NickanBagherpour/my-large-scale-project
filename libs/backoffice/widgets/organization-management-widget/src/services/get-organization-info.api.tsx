import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import { useAppDispatch, useAppState } from '../context';
import Api from './api';

export const useGetOrganizationInfoQuery = (searchValue: number) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.ORGANIZATION_MANAGEMENT.INQUERY],

    queryFn: withErrorHandling(() => Api.getOrganizationInfo(searchValue), dispatch),

    enabled: false,
    networkMode: 'offlineFirst',
  });
};
