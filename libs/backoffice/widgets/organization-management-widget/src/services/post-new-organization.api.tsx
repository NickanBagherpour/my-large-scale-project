import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMessageAction, useAppDispatch, useAppState } from '../context';
import Api from './api';
import { ApiUtil } from '@oxygen/utils';
import { OrganizationParamsType } from '../types';

export const usePostNewOrganizationMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (params: OrganizationParamsType) => Api.postNewOrganization(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
  });
};
