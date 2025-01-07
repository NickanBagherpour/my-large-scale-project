import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import { useAppDispatch } from '../../context';

import { UpstreamCardsData } from '../../types';

import Api from '../api';
export type CardsDetailParamsType = {
  size: number;
  page: number;
  // sort: string[];
  'search-field'?: string;
};
export const useUpstreamCardsDetailQuery = (params: CardsDetailParamsType) => {
  const dispatch = useAppDispatch();

  return useQuery<UpstreamCardsData>({
    queryKey: [RQKEYS.SERVICE_DETAILS.UPSTREAM_TAB_CARD_DETAILS, params],
    queryFn: withErrorHandling(() => Api.getUpstreamCardsDetail(params), dispatch),
  });
};
