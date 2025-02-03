import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../../context';
import Api from '../api';
import { OrganizationInfoParamsType } from '../../types/first-step/organization-info.type';

export const useOrganizationInfoQuery = (params: OrganizationInfoParamsType) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.REUSABLE_COMPONENTS.CLIENT_SERVICES, RQKEYS.BACKOFFICE.CLIENT_CREATION.ORGANIZATION_INFO],
    queryFn: withErrorHandling(() => Api.getOrganizationInfo(params), dispatch),
    enabled: false,
    networkMode: 'offlineFirst',
  });
};
