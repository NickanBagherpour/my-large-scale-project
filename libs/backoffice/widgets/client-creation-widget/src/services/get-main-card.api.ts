import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetMainCardQuery = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.CLIENT_CREATION.MAIN_CARD],
    queryFn: withErrorHandling(() => Api.getMainCardData(), dispatch),
  });
};
