import { useQuery } from '@tanstack/react-query';
import { ServiceParams } from '../types';
import Api from './api';
import { ApiUtil, RQKEYS } from '@oxygen/utils';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { updateMessageAction, useAppDispatch } from '../context';

function isAxiosError(error: Error | null): error is AxiosError {
  return axios.isAxiosError(error);
}

export const useGetService = (params: ServiceParams) => {
  const dispatch = useAppDispatch();
  const [is404Error, setIs404Error] = useState(false);

  const { error, ...rest } = useQuery({
    queryKey: [RQKEYS.SERVICE_CREATION.SERVICE],
    enabled: !params.name,
    queryFn: () => Api.getService(params),
  });

  useEffect(() => {
    // TODO: Handle different 404 error scenarios separately.
    // We need to distinguish whether the 404 is due to the API route being unavailable,
    // or because the requested service does not exist.
    if (isAxiosError(error) && error.status === 404) {
      setIs404Error(true);
    } else {
      updateMessageAction(dispatch, ApiUtil.getErrorMessage(error));
    }
  }, [error, dispatch]);

  return { ...rest, error, is404Error };
};
