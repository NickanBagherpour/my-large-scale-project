import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetScopes = () => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.SERVICE_CREATION.GET_SCOPES],
    queryFn: withErrorHandling(() => Api.getScopes(), dispatch),
  });
};
