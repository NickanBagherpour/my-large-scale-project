import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../../context';
import Api from '../api';

export const useGetTagsDataQuery = () => {
  const dispatch = useAppDispatch();
  return useQuery<any>({
    queryKey: [RQKEYS.BACKOFFICE.CLIENT_CREATION.NAME_TAG],
    queryFn: withErrorHandling(() => Api.getNameTagData(), dispatch),
    select: (data) => {
      return data.map((tag) => ({
        key: tag.id,
        label: tag.title,
      }));
    },
  });
};
