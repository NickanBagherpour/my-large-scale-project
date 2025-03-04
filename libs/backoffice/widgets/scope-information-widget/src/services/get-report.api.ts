import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { Service } from '../types';
import { useAppDispatch } from '../context';
import Api from './api';
export type useGetFirstTabReportDataQueryPropsType = {
  id: string;
};
export const useGetFirstTabReportDataQuery = (props: useGetFirstTabReportDataQueryPropsType) => {
  const { id } = props;
  const dispatch = useAppDispatch();

  return useQuery<Service>({
    queryKey: [RQKEYS.BACKOFFICE.SCOPE_INFORMATION.GET_LIST, id],
    queryFn: withErrorHandling(() => Api.getScopeInfo(id), dispatch),
  });
};
