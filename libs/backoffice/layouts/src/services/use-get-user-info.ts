import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@oxygen/hooks';
import { RQKEYS } from '@oxygen/utils';

import Api from './api';

export const useGetUserInfo = () => {

  const { user } = useAuth();

  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE_AUTH.USER_INFO],
    queryFn: Api.getUserProfile,
    enabled: !user,    // Only run the query if no user data is present
    retry: 3,  // Retries failed requests 1 time
    // cacheTime: 1000 * 60 * 5, // Cache the data for 5 minutes
    // staleTime: 1000 * 60 * 2, // Stale time of 2 minutes
  });
};
