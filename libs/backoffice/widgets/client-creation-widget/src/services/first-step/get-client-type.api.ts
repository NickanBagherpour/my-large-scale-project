import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../../context';
import Api from '../api';
interface DataType {
  title: string;
  code: string;
}

export const useGetClientTypesQuery = () => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.CLIENT_CREATION.SELECT_OPTIONS],
    queryFn: withErrorHandling(() => Api.getClientTypes(), dispatch),
    select: (data: DataType[]) => data.map((item) => ({ label: item.title, value: item.code })),
  });
};
