import { useQuery, useMutation, keepPreviousData } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling, ApiUtil } from '@oxygen/utils';
import { AggregatorsParamsType } from '@oxygen/types';
import { useAppDispatch } from '../../context';
import Api from '../api';

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

export const useFirstStepRequestRegistrationWithSelectedOrganizationMutationQuery = () => {
  debugger;
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (params: any) => Api.requestRegistrationFirstStepWithSelectedOrganization(params),
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
