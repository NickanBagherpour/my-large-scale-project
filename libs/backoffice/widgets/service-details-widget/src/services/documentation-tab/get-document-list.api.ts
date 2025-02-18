import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import { useAppDispatch, useAppState } from '../../context';

import Api from '../api';
import { ConvertedDocumentListResponseType, DocumentListResponseType } from '../../types/documentation-tab';

export const useGetDocumentListQuery = (params: string) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  return useQuery<any>({
    queryKey: [RQKEYS.BACKOFFICE.SERVICE_DETAILS.DOCUMENTATION_TAB_DOCUMENT_LIST, params],
    queryFn: withErrorHandling(() => Api.getDocumentList(params), dispatch),
    networkMode: 'offlineFirst',
    enabled: !!state.serviceName,
    select: (data: DocumentListResponseType[]) => {
      return data.map((item) => ({
        serviceDocumentId: item.serviceDocumentId,
        fileContents: item.fileContents,
        name: item.fileName,
        serviceInfoId: item.serviceInfoId,
        fileGUId: item.fileGUId,
        uid: item.fileGUId,
        deleted: item.deleted,
        status: 'done',
      }));
    },
  });
};
