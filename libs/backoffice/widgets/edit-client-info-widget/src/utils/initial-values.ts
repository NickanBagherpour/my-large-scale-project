import { FORM_ITEM_NAMES } from './form-item-name';

export const initialValues = (userData) => {
  return {
    [FORM_ITEM_NAMES.clientStatus]: userData.clientStatus,
    [FORM_ITEM_NAMES.grantType]: userData.grantType,
    [FORM_ITEM_NAMES.tags]: userData.tags,
    [FORM_ITEM_NAMES.latinNameClient]: userData.latinNameClient,
    [FORM_ITEM_NAMES.persianNameClient]: userData.persianNameClient,
    [FORM_ITEM_NAMES.clientType]: userData.clientType,
    [FORM_ITEM_NAMES.clientId]: userData.clientId,
    [FORM_ITEM_NAMES.identityAuth]: userData.identityAuth,
    [FORM_ITEM_NAMES.websiteUrl]: userData.websiteUrl,
    [FORM_ITEM_NAMES.inputAddress]: userData.inputAddress,
    [FORM_ITEM_NAMES.returnAddress]: userData.returnAddress,
    [FORM_ITEM_NAMES.aggregatorStatus]: userData.aggregatorStatus,
    [FORM_ITEM_NAMES.aggregator]: userData.aggregator,
  };
};
