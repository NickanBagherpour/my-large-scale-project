export const AVAILABLE_ROWS_PER_PAGE = [5, 10, 25, 50, 100];
export const INITIAL_ROW_PER_PAGE = AVAILABLE_ROWS_PER_PAGE[0];
export const INITIAL_PAGE = 1;

export const INQUIRY_MAX_LENGTH = 11;

export const FORM_ITEMS_NAME = {
  LEGAL_ENTITY_NAME: 'legal_entity_name',
  LEGAL_ENTITY_TYPE: 'legal_entity_type',
  REGISTRATION_NUMBER: 'registration_number',
  REGISTRATION_DATE: 'registration_date',
  NATIONAL_ID: 'national_id',
  ECONOMY_CODE: 'economy_code',
  ACTIVITY_FIELD: 'activity_field',
  ZIP_CODE: 'zip_code',
  TELEPHONE: 'telephone',
  LAST_REGISTERED_ADDRESS: 'last_registered_address',

  TECHNICAL_REPRESENTATIVE: {
    FIRST_AND_LAST_NAME: 'technical_first_and_last_name',
    MOBILE_NUMBER: 'technical_mobile_number',
    LANDLINE_NUMBER: 'technical_landline_number',
  },
  REPRESENTATIVE: {
    FIRST_AND_LAST_NAME: 'first_and_last_name',
    MOBILE_NUMBER: 'mobile_number',
    LANDLINE_NUMBER: 'landline_number',
  },
  CLIENT_KEY: {
    CLIENT_KEY: 'client_key',
  },
};
export const FORM_INPUT_VALIDATION = {
  INQUIRY_MAX_LENGTH: 11,
  INPUT_MAX_LENGTH: 255,
  MAX_LEGAL_PERSON_NAME_LENGTH: 255,
  MIN_LEGAL_PERSON_NAME_LENGTH: 3,
  MAX_MOBILE_NUMBER_LENGTH: 11,
  MAX_REGISTRATION_NUMBER_LENGTH: 11,
  MAX_POSTAL_CODE_NUMBER_LENGTH: 10,
  MAX_NATIONAL_ID_NUMBER_LENGTH: 11,
  MAX_ECONOMY_CODE_NUMBER_LENGTH: 12,
  MAX_LAST_REGISTRATION_ADDRESS_LENGTH: 150,
};
export const selectLegalTypeOptions: any[] = [
  { label: 'عام', value: '1' },
  { label: 'خاص', value: '2' },
];
