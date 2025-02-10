import { useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetTags = () => {
  const dispatch = useAppDispatch();

  return useQuery<any>({
    queryKey: [RQKEYS.BACKOFFICE.EDIT_CLIENT_KEYS.TAGS],
    queryFn: withErrorHandling(() => Api.getTagsInfo(), dispatch),
    select: (data) => {
      return data.map((tag) => ({
        key: tag.id,
        label: tag.title,
      }));
    },
  });
};
