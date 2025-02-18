import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import { useAppDispatch } from '../../context';

import Api from '../api';

export const useGetDocumentListQuery = (params: string) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.SERVICE_DETAILS.DOCUMENTATION_TAB_DOCUMENT_LIST, params],
    queryFn: withErrorHandling(() => Api.getDocumentList(params), dispatch),
    networkMode: 'offlineFirst',
  });
};
