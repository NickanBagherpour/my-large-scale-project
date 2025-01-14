import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { GrantType } from '../types';

export const useGetGrantTypeQuery = () => {
  const dispatch = useAppDispatch();

  return useQuery<GrantType>({
    queryKey: [RQKEYS.BACKOFFICE.EDIT_CLIENT_KEYS.GRANT_TYPE],
    queryFn: withErrorHandling(() => Api.getGrantType(), dispatch),
  });
};
