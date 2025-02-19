import { useMutation } from '@tanstack/react-query';

import { ApiUtil, RQKEYS } from '@oxygen/utils';

import { updateMessageAction, useAppDispatch } from '../../context';

import Api from '../api';
import { UploadDocumentParamsType } from '../../types/documentation-tab';
import { queryClient } from '@oxygen/client';

export const usePostUploadDocumentMutation = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (params: UploadDocumentParamsType) => Api.postDocumentUpload(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [RQKEYS.BACKOFFICE.SERVICE_DETAILS.DOCUMENTATION_TAB_DOCUMENT_LIST],
      });
    },
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
    networkMode: 'offlineFirst',
  });
};
