import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useQuery } from '@tanstack/react-query';

import { FetchParamsType } from '../types';
import Api from './api';
import { useAppDispatch } from '../context';

export const useGetServiceInfoQuery = (id: number) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.EDIT_SERVICE.GET_DETAIL, id],
    queryFn: withErrorHandling(() => Api.getServiceInfo(id), dispatch),
  });
};
