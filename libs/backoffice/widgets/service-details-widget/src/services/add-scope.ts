import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { Nullable } from '@oxygen/types';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { Pagination } from '@oxygen/types';

export const useAddServiceScope = () => {
  return useMutation({
    mutationFn: ({ servicename, scopeId }: { servicename: string; scopeId: any }) => {
      return Api.addServiceScope({ servicename, scopeId });
    },
  });
};
