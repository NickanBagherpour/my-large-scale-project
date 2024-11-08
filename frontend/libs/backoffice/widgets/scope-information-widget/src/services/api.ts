import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';
import Mockify from '@oxygen/mockify';

const Api = {
  getReportData: async () => Mockify.getSelectOptions(),
  getServicesData: async (params) => Mockify.getServices(params),
  getExcel: async (params) => Mockify.getServices(params),

};
export default Api;
