import { RQKEYS } from '@oxygen/utils';
import { API_PREFIX } from '@oxygen/client';
import { PaginatedData } from '@oxygen/types';
import { useChangeHistoryQuery } from '@oxygen/hooks';

import { useAppDispatch } from '../context';
import {
  ClientHistoryResponseType,
  FetchClientHistoryParamsType,
  NormalizedClientHistoryItemType,
  NormalizedClientHistoryResponse,
} from '../types';

const normalizer = (
  data: PaginatedData<any> //ClientHistoryResponseType,
): NormalizedClientHistoryResponse => {
  const fullResponse = data as unknown as ClientHistoryResponseType;
  const {
    commonClientInfoDto,
    clientInfoHistoryItemDtos: { content, ...rest },
  } = fullResponse;
  const resultContent: NormalizedClientHistoryItemType[] = content.map((item: any) => {
    const { revisionDto, clientInfoDto } = item;
    const normalizedRevision = Object.fromEntries(Object.entries(revisionDto).map(([key, value]) => [key, value]));
    const normalizedClientDto = Object.fromEntries(
      Object.entries(clientInfoDto).map(([key, value]) => [
        key,
        value && typeof value === 'object' && 'title' in value ? value.title : value,
      ])
    );

    return { ...normalizedRevision, ...normalizedClientDto } as NormalizedClientHistoryItemType;
  });

  return {
    content: resultContent,
    commonClientInfoDto: commonClientInfoDto,
    ...rest,
  } as NormalizedClientHistoryResponse;
};

const {
  CLIENT,
  CLIENT_HISTORY: { GET_LIST },
} = RQKEYS.BACKOFFICE;

export const useGetClientHistoryQuery = (params: FetchClientHistoryParamsType) => {
  const { clientName, page, size } = params;

  const dispatch = useAppDispatch();

  return useChangeHistoryQuery<any>({
    queryKey: [CLIENT, GET_LIST],
    url: `${API_PREFIX.PUBLISHER}/v1/clients/history/${clientName}`,
    dispatch,
    // nestedKeyAccessor: 'clientInfoHistoryItemDtos',
    params: {
      page: page,
      size: size,
    },
    normalizer,
  });
};
