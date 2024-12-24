import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { InquiryParams } from '../types/get-Inquiry-info.type';

export const useInquireService = (params: InquiryParams) => {
  const dispatch = useAppDispatch();
  // return useMutation({
  //   mutationFn: async (params: InquiryParams) => {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     return Api.getInquiryInfo(params);
  //   },
  //   onError: (e) => {
  //     const err = ApiUtil.getErrorMessage(e);
  //     dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
  //   },
  // });
  return useQuery({
    placeholderData: keepPreviousData,
    enabled: false,
    queryFn: withErrorHandling(() => Api.getInquiryInfo(params), dispatch),
    queryKey: [RQKEYS.SERVICES_LIST.DRAFTS, params['service-name']],
  });
};
