import { useQuery, useMutation, keepPreviousData } from '@tanstack/react-query';

import { ApiUtil } from '@oxygen/utils';

import { useAppDispatch } from '../../context';
import Api from '../api';

export const useSecondStepRequestRegistrationMutationQuery = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (params: any) => Api.requestRegistrationSecondStep(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
  });
};
