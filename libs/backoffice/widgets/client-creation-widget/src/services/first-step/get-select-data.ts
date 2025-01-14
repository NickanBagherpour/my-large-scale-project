import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../../context';
import Api from '../api';

export const useSelectDataQuery = () => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.CLIENT_CREATION.SELECT_OPTIONS],
    queryFn: withErrorHandling(() => Api.getSelectData(), dispatch),
  });
};
