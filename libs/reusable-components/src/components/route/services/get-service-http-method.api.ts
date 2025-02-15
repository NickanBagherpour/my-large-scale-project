import { useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import Api from './api';
import { type Dispatch } from 'react';

type Props = {
  dispatch: Dispatch<any>;
};

export const useGetServiceHttpMethod = (props: Props) => {
  const { dispatch } = props;
  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.SERVICE_CREATION.SERVICE_HTTP_METHOD],
    queryFn: withErrorHandling(() => Api.getServiceHttpMethod(), dispatch),
  });
};
