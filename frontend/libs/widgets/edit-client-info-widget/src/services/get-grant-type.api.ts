import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetGrantTypeQuery = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.EDIT_CLIENT_KEYS.GRANT_TYPE],
    queryFn: withErrorHandling(() => Api.getGrantType(), dispatch),
  });
};
