import Mockify from '@oxygen/mockify';

const Api = {
  // getTableReportData: async (params: FetchParamsType) => Mockify.clientCreationTable(params),
  getMainCardData: async () => Mockify.getPlugins(),
  getGrantTagData: async () => Mockify.getGrantTags(),
  getNameTagData: async () => Mockify.getNameTags(),
  getSelectData: async () => Mockify.getSelectOptions(),
};
export default Api;
