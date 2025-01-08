import { useQuery } from '@tanstack/react-query';
import { useAppDispatch } from '../context';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import Api from './api';

export const useGetServiceCategories = () => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.SERVICE_CREATION.CATEGORIES],
    queryFn: withErrorHandling(() => Api.getCategories(), dispatch),
  });
};
