import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import { useAppDispatch } from '../../context';

import Api from '../api';

export const useDeleteRemoveUploadedFileQuery = (params: string) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.SERVICE_DETAILS.DOCUMENTATION_TAB_REMOVE_UPLOADED_FILE, params],
    queryFn: withErrorHandling(() => Api.deleteRemoveUploadedFile(params), dispatch),
    networkMode: 'offlineFirst',
    enabled: false,
  });
};
