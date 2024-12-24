import { useQuery, useMutation, keepPreviousData } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling, ApiUtil } from '@oxygen/utils';
import { RequestRegistration } from '../../types';
import { ParamsType, OrganizationParamsType, AggregatorsParamsType } from '@oxygen/types';
import { useAppDispatch } from '../../context';
import Api from '../api';

// type firstStepParams = {
//   legal_person_name: string;
//   legal_person_type: string;
//   registration_number: string;
//   registration_date: string;
//   national_id: string;
//   economy_code: string;
//   activity_field: string;
//   postal_code: string;
//   phone: string;
//   last_registration_address: string;
// };

export const useSelectDataQuery = () => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.CLIENT_CREATION.SELECT_OPTIONS],
    queryFn: withErrorHandling(() => Api.getSelectData(), dispatch),
  });
};

export const useFirstStepRequestRegistrationMutationQuery = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (params: any) => Api.requestRegistrationFirstStep(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
  });
};

export const useGetOrganizationsQuery = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.REQUEST_REGISTRATION.GET_LIST],
    queryFn: withErrorHandling(() => Api.getOrganizationsListData(), dispatch),
    placeholderData: keepPreviousData,
  });
};

export const useGetAggregatorsQuery = (params: AggregatorsParamsType) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.REQUEST_REGISTRATION.GET_AGGREGATOR_LIST],
    queryFn: withErrorHandling(() => Api.getAggregatorsListData(params), dispatch),
    placeholderData: keepPreviousData,
  });
};
