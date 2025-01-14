import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { FetchParamsType } from '../types';

export const useGetTableDataQuery = (params: FetchParamsType) => {
  console.log('this is the react query params:', params);
  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.CLIENT_CREATION.TABLE_DATA, params],
    queryFn: withErrorHandling(async () => ({ data: undefined })),
    enabled: false,
  });
};
