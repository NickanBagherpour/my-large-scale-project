import { useMutation } from '@tanstack/react-query';
import Api from './api';
import { CreateUpstreamParamsType } from '../types';

export const useCreateUpstreamMutation = () => {
  return useMutation({
    mutationFn: (params: CreateUpstreamParamsType) => Api.postCreateUpstream(params),
    networkMode: 'offlineFirst',
  });
};
