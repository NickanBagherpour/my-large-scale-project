import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../../context';
import Api from '../api';
import { InquiryStatusParamsType } from '../../types';

export const useGetClientInquiryStatusQuery = (params: InquiryStatusParamsType) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.CLIENT_CREATION.INQUIRY_STATUS],
    queryFn: withErrorHandling(() => Api.getClientInquiryStatus(params), dispatch),
  });
};
