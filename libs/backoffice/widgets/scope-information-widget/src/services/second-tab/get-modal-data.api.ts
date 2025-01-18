import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import Api from '../api';
import { useAppDispatch } from '../../context';
import { Nullable } from '@oxygen/types';
// type ModalParamsType = {
//   id: string;
// };
export const useModalInfoQuery = (params: Nullable<string>) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.SCOPE_INFORMATION.GET_MODAL_LIST, params],
    queryFn: withErrorHandling(() => Api.getModalData(params), dispatch),
    networkMode: 'offlineFirst',
  });
};
