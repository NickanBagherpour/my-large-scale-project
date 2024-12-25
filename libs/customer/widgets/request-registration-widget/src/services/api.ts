import { client, portalUrl } from '@oxygen/client';

import {
  FetchParamsType,
  ReportResponseType,
  FirstStepParams,
  SecondStepParams,
  ThirdStepParams,
  RequestRegistration,
} from '../types';
import type { ParamsType, OrganizationParamsType, AggregatorsParamsType } from '@oxygen/types';
import Mockify from '@oxygen/mockify';

// type firstStepParams = {
//   legal_person_name: string;
//   legal_person_type: string;
//   registration_number: string;
//   registration_date: string;
//   national_id: string;
//   economy_code: string;
//   activity_field: string;
//   postal_code: string;
//   phone: string;
//   last_registration_address: string;
// };

const Api = {
  getReportData: async (params: FetchParamsType) => {
    return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
  getSelectData: async () => Mockify.getSelectOptions(),

  getRequestData: async () => {
    const res = Mockify.getRequestData();
    return res;
  },

  getOrganizationsListDataMock: async (params: OrganizationParamsType) => {
    const res = Mockify.getOrganizations(params);
    return res;
  },

  getOrganizationsListData: async () => {
    try {
      const res = await client.get(`${portalUrl}/v1/organizations`);
      return res;
    } catch (error) {
      console.error('Error fetching organization list:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  },

  getAggregatorsListData: async (params: AggregatorsParamsType) => {
    const { page, size, sort } = params;
    const filteredParams = { page, size, sort: 'asc' };
    try {
      const res = await client.get(`${portalUrl}/v1/aggregators`, { params: filteredParams });
      return res;
    } catch (error) {
      console.error('Error fetching aggregator list:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  },

  requestRegistrationFirstStep: async (params: FirstStepParams) => {
    const { organizationId, submissionId, ...restParams } = params;
    if (organizationId && submissionId) {
      return client.put(
        /*<ReportResponseType>*/ `${portalUrl}/v1/organizations/${organizationId}/submissions/${submissionId}`,
        restParams,
        {
          headers: {},
        }
      );
    } else {
      return client.post(/*<ReportResponseType>*/ `${portalUrl}/v1/organizations`, restParams, {
        headers: {},
      });
    }
  },

  requestRegistrationSecondStep: async (params: SecondStepParams) => {
    const apiPrams = {
      submissionId: params.submissionId,
      // submissionId: 20,
      clientKey: params.clientKey,
      representatives: [
        {
          nameAndLastName: params.persian_name,
          mobileNumber: params.mobile_number,
          fixedPhoneNumber: params.phone_number,
          representativeType: 1,
        },
        {
          nameAndLastName: params.technical_persian_name,
          mobileNumber: params.technical_mobile_number,
          fixedPhoneNumber: params.technical_Phone_number,
          representativeType: 2,
        },
      ],
    };
    return client.post(/*<ReportResponseType>*/ `${portalUrl}/v1/representative`, apiPrams, {
      headers: {},
    });
  },

  requestRegistrationThirdStep: async (params: ThirdStepParams) => {
    const apiPrams = {
      requestId: params.requestId,
      servicesIdSet: params.servicesIdSet,
    };
    return client.post(/*<ReportResponseType>*/ `${portalUrl}/v1/submissions/services`, apiPrams, {
      headers: {},
    });
  },
};
export default Api;
