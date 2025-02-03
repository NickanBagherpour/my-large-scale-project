import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetClientTypes = () => {
  const dispatch = useAppDispatch();

  return useQuery<any>({
    queryKey: [RQKEYS.BACKOFFICE.EDIT_APPLICANT_INFO.CLIENT_TYPES],
    queryFn: withErrorHandling(() => Api.getClientType(), dispatch),
    select: (data) => {
      return data.map((item) => ({
        value: item.code,
        label: item.title,
      }));
    },
  });
};
