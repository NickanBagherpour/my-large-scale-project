import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetApplicantInfo = (reqId) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.EDIT_APPLICANT_INFO.APPLICANT_INFO],
    queryFn: withErrorHandling(() => Api.getApplicantInfo(reqId), dispatch),
  });
};
