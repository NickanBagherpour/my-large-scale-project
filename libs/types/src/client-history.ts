export type ClientHistoryData = {
  editTime: string;
  adminName: string;
  clientenglishName: string;
  clientFarsiName: string;
  clientType: string;
  clientId: string;
  verificationId: string;
  aggregatorStatus: string;
  aggregatorName: string;
  address: string;
  inputAddress: string;
};

export type scopeHistoryData = {
  modify_date: string;
  user_name: string;
  english_name: string;
  farsi_name: string;
  clientType: string;
  clientId: string;
  verificationId: string;
  aggregatorStatus: string;
  aggregatorName: string;
  address: string;
  inputAddress: string;
};

export type routeHistoryData = {
  modify_date: string;
  user_name: string;
  action_method: string;
  protocol: string;
  path: string;
  host: string;
};
