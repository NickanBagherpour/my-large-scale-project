import { useQuery } from '@tanstack/react-query';

import { RQKEYS } from '@oxygen/utils';
import Api from './api';

export const useGetCaptchaQuery = () => {
  return useQuery({
    queryKey: [RQKEYS.CUSTOMER.AUTH.CAPTCHA],
    queryFn: () => Api.getCaptcha(),
    staleTime: 0,
    select: (res) => {
      return {
        captchaImage: res.data,
        captchaToken: res?.headers['captcha-token'],
      };
    },
  });
};
