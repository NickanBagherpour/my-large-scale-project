import { useQuery } from '@tanstack/react-query';

import { getCookie, RQKEYS } from '@oxygen/utils';

import Api from './api';
import { CookieKey } from '@oxygen/types';

export const useGetUserInfo = () => {
  const token = getCookie(CookieKey.SESSION_ID);
  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE_AUTH.USER_INFO],
    queryFn: Api.getUserProfile,
    enabled: !!token,
    retry: 3, // Retries failed requests 1 time
    gcTime: 1000 * 60 * 60 * 24, // Cache the data for 24 hours
    staleTime: 1000 * 60 * 60 * 24, // Stale time of 24 minutes
  });
};
