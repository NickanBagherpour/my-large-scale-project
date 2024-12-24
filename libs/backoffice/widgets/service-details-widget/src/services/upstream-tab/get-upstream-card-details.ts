import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import { useAppDispatch } from '../../context';

import { UpstreamListData } from '../../types';

import Api from '../api';

export const useUpstreamCardDetailsQuery = (params: string | number) => {
  const dispatch = useAppDispatch();

  return useQuery<UpstreamListData>({
    queryKey: [RQKEYS.SERVICE_DETAILS.UPSTREAM_TAB_CARD_DETAILS, params],
    queryFn: withErrorHandling(() => Api.getUpstreamCardDetails(params), dispatch),
  });
};
