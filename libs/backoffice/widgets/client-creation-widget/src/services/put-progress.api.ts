import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { useQuery } from '@tanstack/react-query';

type ProgressQueryParams = {
  clientName: string;
  progressCode: number;
};
export const usePutProgressQuery = (params: ProgressQueryParams) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.CLIENT_CREATION, params],
    queryFn: () => {
      withErrorHandling(() => Api.putProgress(params), dispatch);
    },
    networkMode: 'offlineFirst',
    enabled: false,
  });
};
