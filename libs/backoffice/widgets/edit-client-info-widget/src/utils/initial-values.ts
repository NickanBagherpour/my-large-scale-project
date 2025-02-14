import { FORM_ITEM_NAMES } from './form-item-name';

export const initialValues = (userData) => {
  return {
    [FORM_ITEM_NAMES.latinNameClient]: userData?.clientEnglishName,
    [FORM_ITEM_NAMES.persianNameClient]: userData?.clientPersianName,
    [FORM_ITEM_NAMES.clientType]: userData?.clientTypeCode,
    [FORM_ITEM_NAMES.clientId]: userData?.clientKey,
    [FORM_ITEM_NAMES.identityAuth]: userData?.authorizationKey,
    [FORM_ITEM_NAMES.websiteUrl]: userData?.websiteUrl,
    [FORM_ITEM_NAMES.inputAddress]: userData?.inboundAddress,
    [FORM_ITEM_NAMES.returnAddress]: userData?.redirectUrl,
  };
};
