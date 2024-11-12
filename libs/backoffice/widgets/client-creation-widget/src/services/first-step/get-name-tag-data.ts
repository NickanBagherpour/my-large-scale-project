import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../../context';
import Api from '../api';

export const useGetnameTagDataQuery = () => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.CLIENT_CREATION.NAME_TAG],
    queryFn: withErrorHandling(() => Api.getNameTagData(), dispatch),
  });
};
