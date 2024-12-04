import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../../context';
import Api from '../api';
// import { GrantType } from '../types';

export const useUpstreamCardDetailsQuery = () => {
  const dispatch = useAppDispatch();

  return useQuery<any>({
    queryKey: [RQKEYS.SERVICE_DETAILS.UPSTREAM_TAB_CARD_DETAILS],
    queryFn: withErrorHandling(() => Api.getUpstreamCardDetails(), dispatch),
  });
};
