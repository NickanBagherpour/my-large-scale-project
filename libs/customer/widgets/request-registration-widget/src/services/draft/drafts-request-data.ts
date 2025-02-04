import { useMutation } from '@tanstack/react-query';

import { ApiUtil } from '@oxygen/utils';
import { useAppDispatch } from '../../context';
import Api from '../api';

export const useGetRequestDataFromDraftsMutationQuery = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (SubmissionId: string | null) => Api.getRequestDataFromDrafts(SubmissionId),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
  });
};
