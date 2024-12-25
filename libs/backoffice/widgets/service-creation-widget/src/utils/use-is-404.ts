import { useEffect, useState } from 'react';
import { updateMessageAction, useAppDispatch } from '../context';
import { ApiUtil } from '@oxygen/utils';
import { isAxiosError } from './error-util';

export function useIs404(error: Error | null) {
  const dispatch = useAppDispatch();
  const [is404Error, setIs404Error] = useState(false);

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

  return is404Error;
}
