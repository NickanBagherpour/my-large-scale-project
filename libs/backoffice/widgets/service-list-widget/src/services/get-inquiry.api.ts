import { useMutation, useQuery } from '@tanstack/react-query';
import { useAppDispatch } from '../context';
import { InquiryParams } from '../types/get-Inquiry-info.type';
import Api from './api';
import { ApiUtil } from '@oxygen/utils';

export const useInquireService = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (params: InquiryParams) => Api.getInquiryInfo(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
  });
};
