import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.log('queryCache : react query error', error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: unknown) => {
      console.log('mutationCache: react query error', error);
    },
  }),

  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      throwOnError: false,
      gcTime: 1000 * 10, // cache time of 1 minute
      staleTime: 1000 * 10 , // Stale time of 10 sec
    },
  },
});
