import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../../context';
import Api from '../api';
import { ClientDraftDataType, ConvertedClientDraftDataType } from '../../types/first-step/client-draft.type';

export const useGetClientDraftInfoQuery = (params: string) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.CLIENT_CREATION.CLIENT_DRAFT_INFO, params],
    queryFn: withErrorHandling(() => Api.getClientDraftInfo(params), dispatch),
    enabled: false,
    select: (data: ClientDraftDataType) => {
      const updatedTagIds = data.tagIds.map((tag) => ({
        key: tag.code,
        label: tag.title,
      }));
      const convertedData: ConvertedClientDraftDataType = {
        ...data,
        tagIds: updatedTagIds,
      };
      return convertedData;
    },
  });
};
