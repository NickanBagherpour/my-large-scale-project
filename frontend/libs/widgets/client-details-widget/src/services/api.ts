import Mockify from '@oxygen/mockify';

const Api = {
  getClientInfoData: async () => Mockify.getClientInfo(),
};
export default Api;
