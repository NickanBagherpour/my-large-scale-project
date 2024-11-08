import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import Api from '../api';
import { useAppDispatch } from '../../context';
type ExcelDownloadParamsType = {
  id: string;
};
export const useExcelDownloadQuery = (params: ExcelDownloadParamsType) => {
  const dispatch = useAppDispatch();
  console.log(params);
  return useQuery({
    queryKey: [RQKEYS.SCOPE_INFORMATION.GET_EXCEL, params],
    queryFn: withErrorHandling(() => Api.getExcel(params), dispatch),
    networkMode: 'offlineFirst',
    enabled: false,
  });
};
