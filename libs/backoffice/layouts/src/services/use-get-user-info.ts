import Api from './api';
import { useQuery } from '@tanstack/react-query';

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: Api.getUserProfile,
    retry: 3,  // Retries failed requests 1 time
    // cacheTime: 1000 * 60 * 5, // Cache the data for 5 minutes
    // staleTime: 1000 * 60 * 2, // Stale time of 2 minutes
  });
};
