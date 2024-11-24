import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';

const Api = {
  getReportData: async (params: FetchParamsType) => {
    return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
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

    return client.post/*<ReportResponseType>*/(`${portalUrl}/v1/client/register`, restParams, {
      headers: { 'Captcha-Token': captchaToken },
    });
  },
  postVerifyRegisterOTP: async (params: any) => {

    const { otpKey,otpValue  } = params;

    console.log('postRegisterUser:', params);

    return client.post/*<ReportResponseType>*/(`${portalUrl}/v1/otp/verify/register`, {}, {
      headers: {
        'key': otpKey,
        'value': otpValue,
      },
    });
  },
};
export default Api;
