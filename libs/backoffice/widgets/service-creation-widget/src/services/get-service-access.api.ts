import { useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetServiceAccess = () => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.SERVICE_CREATION.SERVICE_ACCESS],
    queryFn: withErrorHandling(() => Api.getServiceAccess(), dispatch),
  });
};
