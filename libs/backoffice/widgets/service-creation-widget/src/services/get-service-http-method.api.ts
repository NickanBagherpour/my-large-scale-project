import { useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetServiceHttpMethod = () => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.SERVICE_CREATION.SERVICE_HTTP_METHOD],
    queryFn: withErrorHandling(() => Api.getServiceHttpMethod(), dispatch),
  });
};
