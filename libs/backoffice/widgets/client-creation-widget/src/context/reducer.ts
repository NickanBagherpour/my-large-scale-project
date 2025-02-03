import { FormFieldsType } from '../types';
import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE } from '../utils/consts';
import { WidgetActionType, WidgetStateType } from './types';

export const initialStateValue: WidgetStateType = {
  clientName: undefined,
  firstStep: {
    grant_tag: [],
    tagIds: [],
    ssoClientId: undefined,
    clientEnglishName: undefined,
    clientPersianName: undefined,
    clientTypeCode: undefined,
    clientKey: undefined,
    authorizationKey: undefined,
    websiteUrl: undefined,
    inboundAddress: undefined,
    redirectUrl: undefined,
    organizationNationalId: undefined,
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

    case 'ADD_CLIENT_NAME': {
      state.clientName = action.payload;
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
