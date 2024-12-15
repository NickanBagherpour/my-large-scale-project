import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../../context';
import Api from '../api';

export const useGetRequestQuery = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.SERVICES_LIST.GET_LIST],
    queryFn: withErrorHandling(() => Api.getRequestData(), dispatch),
    placeholderData: keepPreviousData,
  });
};
