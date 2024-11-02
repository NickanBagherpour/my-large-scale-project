import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';
import Mockify from '@oxygen/mockify';

const Api = {
  getTableReportData: async (params: FetchParamsType) => Mockify.clientCreationTable(params),
};
export default Api;
