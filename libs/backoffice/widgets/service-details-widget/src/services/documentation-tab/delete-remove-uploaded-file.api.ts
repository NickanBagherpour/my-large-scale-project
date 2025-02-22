import { useMutation, useQuery } from '@tanstack/react-query';

import { ApiUtil, RQKEYS, withErrorHandling } from '@oxygen/utils';

import { updateMessageAction, useAppDispatch } from '../../context';

import Api from '../api';

export const useDeleteRemoveUploadedFileQuery = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (params: any) => Api.deleteRemoveUploadedFile(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
    networkMode: 'offlineFirst',
  });
};
