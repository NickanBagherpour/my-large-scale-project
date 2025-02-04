import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../../context';
import Api from '../api';

export const useClientInquiryStatusQuery = (params) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.CLIENT_CREATION.INQUIRY_STATUS],
    queryFn: withErrorHandling(() => Api.getClientInquiryStatus(params), dispatch),
  });
};
