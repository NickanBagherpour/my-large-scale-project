import { MenuItemType } from '@oxygen/ui-kit';

export const AVAILABLE_ROWS_PER_PAGE = [5, 10, 25, 50, 100];
export const INITIAL_ROW_PER_PAGE = AVAILABLE_ROWS_PER_PAGE[0];
export const INITIAL_PAGE = 1;

export const MAX_INPUTE_LENGTH = 75;
export const MAX_MOBILE_NUMBER_LENGTH = 11;
export const MAX_POSTAL_CODE_NUMBER_LENGTH = 10;
export const MAX_NATIONAL_ID_NUMBER_LENGTH = 11;
export const MAX_ECONOMY_CODE_NUMBER_LENGTH = 12;

export const FORM_ITEM = {
  //firstStep
  aggregator_status: 'aggregator_status',
  aggregator_value: 'aggregator_value',
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
  //secondStep
  persian_name: 'persian_name',
  mobile_number: 'mobile_number',
  phone_number: 'phone_number',
  technical_persian_name: 'technical_persian_name',
  technical_mobile_number: 'technical_mobile_number',
  technical_Phone_number: 'technical_Phone_number',
  clientKey: 'clientKey',

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
export const selectLegalTypeOptions: any[] = [
  { label: 'عام', value: '1' },
  { label: 'خاص', value: '2' },
];

export const LIMITAION_FORM_NAME = {
  serviceCallRate: 'serviceCallRate',
  serviceCallRateOptions: 'serviceCallRateOptions',
  totalCallLimit: 'totalCallLimit',
  callLimitOptions: 'callLimitOptions',
};
