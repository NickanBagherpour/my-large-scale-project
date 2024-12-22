import Mockify from '@oxygen/mockify';

const Api = {
  getRequestList: async (params) => Mockify.getRequestList(params),
};
export default Api;
