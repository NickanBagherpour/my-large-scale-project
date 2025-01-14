import { useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetTags = () => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.SERVICE_CREATION.TAGS],
    queryFn: withErrorHandling(() => Api.getTags(), dispatch),
  });
};
