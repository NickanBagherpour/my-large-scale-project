import { client, portalUrl } from '@oxygen/client';

import { FetchIpType, FetchParamsType, ReportResponseType } from '../types';

const Api = {
  getIP: async (params: any) => {
    try {
      const response = await client.get<FetchIpType>('/api/auth/ip');
      return response.data; // This will contain the IP address
    } catch (error) {
      console.error('Error fetching IP:', error);
      throw error; // Re-throw the error for further handling if needed
    }
  },
  getCaptcha: async () => {
    const response = await client.get(`${portalUrl}/v1/captcha`, {
      responseType: 'blob', // Important for handling binary data
    });

    return {
      data: response.data,
      headers: response.headers,
    };
  },
  postRegisterUser: async (params: any) => {
    const { captchaToken, ...restParams } = params;

    return client.post(/*<ReportResponseType>*/ `${portalUrl}/v1/client/register`, restParams, {
      headers: { 'Captcha-Token': captchaToken },
    });
  },
  postVerifyRegisterOTP: async (params: any) => {
    const { otpKey, otpValue } = params;

    return client.post(
      /*<ReportResponseType>*/ `${portalUrl}/v1/otp/verify/register`,
      {},
      {
        headers: {
          key: otpKey,
          value: otpValue,
        },
      }
    );
  },
  postLoginUser: async (params: any) => {
    const { captchaToken, ...restParams } = params;

    return client.post(/*<ReportResponseType>*/ `${portalUrl}/v1/client/login`, restParams, {
      headers: { 'Captcha-Token': captchaToken },
    });
  },
  postVerifyLoginOTP: async (params: any) => {
    const { otpKey, otpValue } = params;

    return client.post(
      /*<ReportResponseType>*/ `${portalUrl}/v1/otp/verify/login`,
      {},
      {
        headers: {
          key: otpKey,
          value: otpValue,
        },
      }
    );
  },
};

export default Api;
