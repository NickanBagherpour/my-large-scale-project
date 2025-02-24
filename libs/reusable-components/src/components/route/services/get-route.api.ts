import { useQuery } from '@tanstack/react-query';
import Api from './api';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { type Dispatch } from 'react';

type Props = {
  dispatch: Dispatch<any>;
  serviceName: string;
};

export const useGetRoute = (props: Props) => {
  const { dispatch, serviceName } = props;

  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.SERVICE_CREATION.ROUTE, serviceName],
    enabled: !!serviceName,
    queryFn: withErrorHandling(() => Api.getRoute(serviceName), dispatch, { ignore404Errors: true }),
  });
};
