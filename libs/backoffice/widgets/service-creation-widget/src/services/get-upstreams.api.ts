import { useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetUpstreams = () => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.SERVICE_CREATION.UPSTREAMS],
    queryFn: withErrorHandling(() => Api.getUpstreams(), dispatch),
  });
};
