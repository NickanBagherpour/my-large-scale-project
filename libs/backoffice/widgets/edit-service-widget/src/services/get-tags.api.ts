import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import Api from './api';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch } from '../context';

export const useGetServiceTags = () => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.SERVICE_CREATION.TAGS],
    queryFn: withErrorHandling(() => Api.getTags(), dispatch),
  });
};
