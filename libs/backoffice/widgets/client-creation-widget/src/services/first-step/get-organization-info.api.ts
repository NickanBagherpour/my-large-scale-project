import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import {
  resetOrganizationInfoAction,
  updateFirstStepAction,
  updateOrgStatusAction,
  useAppDispatch,
  useAppState,
} from '../../context';
import Api from '../api';
import { OrganizationInfoParamsType } from '../../types/first-step/organization-info.type';

export const useGetOrganizationInfoQuery = (params: OrganizationInfoParamsType) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.CLIENT_CREATION.ORGANIZATION_INFO],
    queryFn: withErrorHandling(async () => {
      try {
        updateOrgStatusAction(dispatch, 'normal');
        const result = await Api.getOrganizationInfo(params);
        updateOrgStatusAction(dispatch, 'success');
        return result;
      } catch (e) {
        updateOrgStatusAction(dispatch, 'error');
        resetOrganizationInfoAction(dispatch);
        throw e;
      }
    }, dispatch),
    enabled: false,
    networkMode: 'offlineFirst',
  });
};
