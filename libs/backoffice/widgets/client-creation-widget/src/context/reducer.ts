import { FormFieldsType } from '../types';
import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE } from '../utils/consts';
import { WidgetActionType, WidgetStateType } from './types';

export const initialStateValue: WidgetStateType = {
  firstStep: {
    grant_tag: [],
    add_tag: [],
    latin_name_client: undefined,
    persian_name_client: undefined,
    client_type: undefined,
    client_id: undefined,
    identity_auth: undefined,
    website_url: undefined,
    input_address: undefined,
    return_address: undefined,
    aggregator_status: undefined,
    aggregator: undefined,
    user_uame: undefined,
    national_code: undefined,
    organization_name: undefined,
    mobile_number: undefined,
    telephone: undefined,
    email: undefined,
  },
  secondStep: { table: [] },
  message: null,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  //console.log(action.type, state, action);
  switch (action.type) {
    case 'UPDATE_GLOBAL_MESSAGE': {
      state.message = action.payload;
      return;
    }

    case 'UPDATE_FIRST_STEP_FORM': {
      state.firstStep = { ...action.payload };
      return;
    }
    case 'UPDATE_SECOND_STEP_TABLE': {
      state.secondStep.table = [...state.secondStep.table, { ...action.payload }];
      return;
    }

    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
