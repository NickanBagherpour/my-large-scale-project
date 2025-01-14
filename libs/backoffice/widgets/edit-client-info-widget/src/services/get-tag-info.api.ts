import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { TagsType } from '../types';

export const useGetTags = () => {
  const dispatch = useAppDispatch();

  return useQuery<TagsType>({
    queryKey: [RQKEYS.BACKOFFICE.EDIT_CLIENT_KEYS.TAGS],
    queryFn: withErrorHandling(() => Api.getTagsInfo(), dispatch),
  });
};
