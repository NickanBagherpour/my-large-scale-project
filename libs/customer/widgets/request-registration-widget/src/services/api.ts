import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, ReportResponseType, ParamsType } from '../types';
import Mockify from '@oxygen/mockify';

type firstStepParams = {
  legal_person_name: string;
  legal_person_type: string;
  registration_number: string;
  registration_date: string;
  national_id: string;
  economy_code: string;
  activity_field: string;
  postal_code: string;
  phone: string;
  last_registration_address: string;
};

const Api = {
  getReportData: async (params: FetchParamsType) => {
    return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
  getSelectData: async () => Mockify.getSelectOptions(),

  getRequestData: async () => {
    const res = Mockify.getRequestData();
    return res;
  },

  requestRegistrationFirstStep: async (params: firstStepParams) => {
    const { ...restParams } = params;
    return client.post(/*<ReportResponseType>*/ `${portalUrl}/v1/organizations`, restParams, {
      headers: {},
    });
  },
};
export default Api;
