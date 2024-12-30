import { updateMessageAction, useAppDispatch } from '../context';
import { useMutation } from '@tanstack/react-query';
import Api from './api';
import { ApiUtil } from '@oxygen/utils';
import { PostSubmissionReviewParamsType } from '../types';

export const usePostSubmissionResultMutation = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (params: PostSubmissionReviewParamsType) => Api.postSubmissionReview(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },

    networkMode: 'offlineFirst',
  });
};
