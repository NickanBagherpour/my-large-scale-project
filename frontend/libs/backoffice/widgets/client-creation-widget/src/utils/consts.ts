import { MenuItemType } from '@oxygen/ui-kit';

export const AVAILABLE_ROWS_PER_PAGE = [5, 10, 25, 50, 100];
export const INITIAL_ROW_PER_PAGE = AVAILABLE_ROWS_PER_PAGE[0];
export const INITIAL_PAGE = 1;

export const FormItem = {
  latin_name_client: 'latin-name-client',
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
