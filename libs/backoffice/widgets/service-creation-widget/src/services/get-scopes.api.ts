import { useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { ScopesParams } from '../types/scopes.type';

export const useGetScopes = (params: ScopesParams) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.SERVICE_CREATION.SCOPES, params],
    queryFn: withErrorHandling(() => Api.getScopes(params), dispatch),
    enabled: params['scope-name'].length > 3,
  });
};
