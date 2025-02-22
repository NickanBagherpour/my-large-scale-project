import { useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import Api from './api';
import { type Dispatch } from 'react';

type Props = {
  dispatch: Dispatch<any>;
};

export const useGetServiceProtocol = (props: Props) => {
  const { dispatch } = props;
  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.SERVICE_CREATION.SERVICE_PROTOCOL],
    queryFn: withErrorHandling(() => Api.getServiceProtocol(), dispatch),
  });
};
