import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@oxygen/hooks';
import { RQKEYS } from '@oxygen/utils';

import Api from './api';

export const useGetUserInfo = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE_AUTH.USER_INFO],
    queryFn: Api.getUserProfile,
    enabled: !user || !user?.national_code, // Only run the query if no user data is present
    retry: 3, // Retries failed requests 1 time
    gcTime: 1000 * 60 * 60 * 24, // Cache the data for 24 hours
    staleTime: 1000 * 60 * 60 * 24, // Stale time of 24 minutes
  });
};
