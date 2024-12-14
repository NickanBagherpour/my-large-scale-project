import { useQuery, useMutation } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling, ApiUtil } from '@oxygen/utils';
import { RequestRegistration } from '../../types';
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

export const useGetOrganizationDataMutationQuery = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (params: any) => Api.getOrganizationData(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
  });
  // return useQuery({
  //   queryKey: [RQKEYS.REQUEST_REGISTRATION.GET_LIST],
  //   queryFn: withErrorHandling(() => Api.getOrganizationData(params), dispatch),
  // });
};

// export const useGetOrganizationDataQuery = (params: RequestRegistration) => {
//   const dispatch = useAppDispatch();
//   return useQuery({
//     queryKey: [RQKEYS.REQUEST_REGISTRATION.GET_LIST],
//     queryFn: withErrorHandling(() => Api.getOrganizationData(params), dispatch),
//   });
// };
