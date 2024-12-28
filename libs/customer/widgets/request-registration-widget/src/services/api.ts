import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, ReportResponseType, FirstStepParams, SecondStepParams, ThirdStepParams } from '../types';
import type { OrganizationParamsType, AggregatorsParamsType } from '@oxygen/types';
import Mockify from '@oxygen/mockify';

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

  geRequestData: async (submissionId: string) => {
    try {
      const res = await client.get(`${portalUrl}/v1/submissions/${submissionId}`);
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
      return client.put(`${portalUrl}/v1/organizations/${organizationId}/submissions/${submissionId}`, restParams, {
        headers: {},
      });
    } else {
      return client.post(`${portalUrl}/v1/organizations`, restParams, {
        headers: {},
      });
    }
  },

  requestRegistrationFirstStepWithSelectedOrganization: async (params: { organizationId: number }) => {
    const { organizationId } = params;

    return client.post(`${portalUrl}/v1/submissions/organizations/${organizationId}`, {
      headers: {},
    });
  },

  requestRegistrationSecondStep: async (params: SecondStepParams) => {
    const apiPrams = {
      submissionId: params.submissionId,
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
    return client.post(`${portalUrl}/v1/representative`, apiPrams, {
      headers: {},
    });
  },

  requestRegistrationThirdStep: async (params: ThirdStepParams) => {
    const apiPrams = {
      requestId: params.requestId,
      servicesIdSet: params.servicesIdSet,
    };
    return client.post(`${portalUrl}/v1/submissions/services`, apiPrams, {
      headers: {},
    });
  },

  requestRegistrationFourthStepWithSelectedOrganization: async (params: { submissionId: number }) => {
    const { submissionId } = params;
    return client.post(`${portalUrl}/v1/submissions/${submissionId}`, {
      headers: {},
    });
  },
};
export default Api;
