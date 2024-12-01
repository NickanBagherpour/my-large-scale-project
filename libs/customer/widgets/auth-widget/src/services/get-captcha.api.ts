import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetCaptchaQuery = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.CUSOMTER_AUTH.CAPTCHA],
    queryFn: () => Api.getCaptcha(),
    select: (res) => {
      return {
        captchaImage: res.data,
        captchaToken: res?.headers['captcha-token'],
      };
    },
  });
};
