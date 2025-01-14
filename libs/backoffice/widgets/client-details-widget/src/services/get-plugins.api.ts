import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetPluginsQuery = () => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.CLIENT_DETAILS.PLUGINS],
    queryFn: withErrorHandling(() => Api.getPluginsData(), dispatch),
    placeholderData: keepPreviousData,
  });
};
