import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import Api from './api';
import { useAppDispatch } from '../context';
import { OrganizationInfoParamsType } from '../types/get-organization-info.type';

export const useGetOrganizationInfoQuery = (params: OrganizationInfoParamsType, setIsError) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.ORGANIZATION_MANAGEMENT.INQUIRY],
    queryFn: async () => {
      try {
        const res = await withErrorHandling(() => Api.getOrganizationInfo(params), dispatch, {
          ignore404Errors: true,
        })();
        return res;
      } catch (e: any) {
        setIsError(e?.response?.status);
      }
    },
    // queryFn: withErrorHandling(async () => Api.getOrganizationInfo(params), dispatch),
    // throwOnError:(...e)=>{console.log(e)},
    enabled: false,
    networkMode: 'offlineFirst',
  });
};
