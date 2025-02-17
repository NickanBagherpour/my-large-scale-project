import { useMutation } from '@tanstack/react-query';

import { ApiUtil } from '@oxygen/utils';

import { updateMessageAction, useAppDispatch } from '../../context';

import Api from '../api';
import { Nullable } from '@oxygen/types';

export const usePostUploadDocumentMutation = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (params: number) => Api.postDocumentUpload(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
    networkMode: 'offlineFirst',
  });
};
