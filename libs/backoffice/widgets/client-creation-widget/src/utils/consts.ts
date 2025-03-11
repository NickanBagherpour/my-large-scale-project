import { MenuItemType } from '@oxygen/ui-kit';

export const AVAILABLE_ROWS_PER_PAGE = [5, 10, 25, 50, 100];
export const INITIAL_ROW_PER_PAGE = AVAILABLE_ROWS_PER_PAGE[0];
export const INITIAL_PAGE = 1;

export const MAX_INPUTE_LENGTH = 225;
export const MAX_MOBILE_NUMBER_LENGTH = 11;

export const FORM_ITEM = {
  GRANT_TYPE: 'grantType',
  TAG_IDS: 'tagIds',
  CLIENT_ENGLISH_NAME: 'clientEnglishName',
  CLIENT_PERSIAN_NAME: 'clientPersianName',
  CLIENT_TYPE_CODE: 'clientTypeCode',
  CLIENT_KEY: 'clientKey',
  AUTHORIZATION_KEY: 'authorizationKey',
  WEBSITE_URL: 'websiteUrl',
  INBOUND_ADDRESS: 'inboundAddress',
  REDIRECT_URL: 'redirectUrl',
};

export const dropdownOptions: MenuItemType[] = [
  { label: 'Client Flow', key: 'option1' },
  { label: 'Password Flow', key: 'option2' },
  { label: 'Implicit Flow', key: 'option4' },
  { label: 'Refresh Token', key: 'option5' },
  { label: 'Client Flow', key: 'option6' },
  { label: 'Password Flow', key: 'option7' },
  { label: 'Authorization Code Flow', key: 'option8' },
];
export const selectOptions: any[] = [
  { label: 'test 1', value: 'test 1' },
  { label: 'test 2', value: 'test 2' },
  { label: 'test 3', value: 'test 4' },
  { label: 'test 4', value: 'test 5' },
  { label: 'test 5', value: 'test 6' },
  { label: 'test 6', value: 'test 7' },
  { label: 'test 7', value: 'test 8' },
];

export const LIMITAION_FORM_NAME = {
  serviceCallRate: 'serviceCallRate',
  serviceCallRateOptions: 'serviceCallRateOptions',
  totalCallLimit: 'totalCallLimit',
  callLimitOptions: 'callLimitOptions',
};

export enum ClientInquiryStatus {
  'CLIENT_IS_OPERATIONAL' = 1,
  'CLIENT_IS_DRAFT' = 2,
  'CLIENT_NOT_FOUND' = 3,
  'CLIENT_EXISTS_IN_BAM' = 4,
}

export const GrantValue = [
  {
    key: 'ClientFlow',
    label: 'ClientFlow',
  },
  {
    key: 'PasswordFlow',
    label: 'PasswordFlow',
  },
  {
    key: 'AuthorizationFlow',
    label: 'AuthorizationFlow',
  },
  {
    key: 'ImplicitFlow',
    label: 'ImplicitFlow',
  },
  {
    key: 'RefreshToken',
    label: 'RefreshToken',
  },
];

export const CLIENT_NAME = 'client-name';
export const PROGRESS_CODE = {
  SERVICE_ASSIGNED: 11,
  PLUGIN_ASSIGNED: 12,
};
