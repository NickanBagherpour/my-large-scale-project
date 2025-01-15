import { useMutation } from '@tanstack/react-query';

import { ApiUtil, encrypt, setCookie } from '@oxygen/utils';
import { CookieKey } from '@oxygen/types';

import { useAppDispatch } from '../context';
import Api from './api';
import { AUTH_SESSION_DURATION } from '../utils/consts';

export const useVerifyLoginMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (params: any) => Api.postVerifyLoginOTP(params),
    onSuccess: async (data) => {
      const sessionId = data?.headers['authorization'];
      setCookie(CookieKey.SESSION_ID, encrypt(sessionId), AUTH_SESSION_DURATION);
      return data;
    },
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
  });
};
