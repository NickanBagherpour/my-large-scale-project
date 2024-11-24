import { MenuItemType } from '@oxygen/ui-kit';

export const AVAILABLE_ROWS_PER_PAGE = [5, 10, 25, 50, 100];
export const INITIAL_ROW_PER_PAGE = AVAILABLE_ROWS_PER_PAGE[0];
export const INITIAL_PAGE = 1;

export const MAX_INPUTE_LENGTH = 75;
export const MAX_MOBILE_NUMBER_LENGTH = 11;

export const FORM_ITEM = {
  legal_person_name: 'legal_person_name',
  legal_person_type: 'legal_person_type',
  registration_number: 'registration_number',
  registration_date: 'registration_date',
  national_id: 'national_id',
  economy_code: 'economy_code',
  activity_field: 'activity_field',
  postal_code: 'postal_code',
  phone: 'phone',
  last_registration_address: 'last_registration_address',

  grant_tag: 'grant_tag',
  add_tag: 'add_tag',
  latin_name_client: 'latin_name_client',
  persian_name_client: 'persian_name_client',
  client_type: 'client_type',
  client_id: 'client_id',
  identity_auth: 'identity_auth',
  website_url: 'website_url',
  input_address: 'input_address',
  return_address: 'return_address',
  aggregator_status: 'aggregator_status',
  aggregator: 'aggregator',
  user_name: 'user_name',
  national_code: 'national_code',
  organization_name: 'organization_name',
  mobile_number: 'mobile_number',
  telephone: 'telephone',
  email: 'email',
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
