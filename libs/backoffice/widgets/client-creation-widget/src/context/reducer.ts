import { FormFieldsType } from '../types';
import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE } from '../utils/consts';
import { WidgetActionType, WidgetStateType } from './types';

export const initialStateValue: WidgetStateType = {
  orgStatus: 'normal',
  clientName: undefined,
  clientStatus: undefined,
  firstStep: {
    clientId: undefined,
    ssoClientId: undefined,
    clientEnglishName: undefined,
    clientPersianName: undefined,
    clientTypeCode: undefined,
    clientTypeName: undefined,
    clientKey: undefined,
    authorizationKey: undefined,
    websiteUrl: undefined,
    inboundAddress: undefined,
    redirectUrl: undefined,
    description: undefined,
    isClientFlow: undefined,
    isPasswordFlow: undefined,
    isAuthorizationFlow: undefined,
    isImplicitFlow: undefined,
    tagIds: [],
    isRefreshToken: undefined,
    organizationInfo: {
      organizationId: undefined,
      organizationName: undefined,
      organizationNationalId: undefined,
      isAggregator: undefined,
      aggregatorId: undefined,
      aggregatorName: undefined,
      representative: {
        nameAndLastName: undefined,
        mobileNumber: undefined,
        fixedPhoneNumber: undefined,
        representativeType: undefined,
      },
    },
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
    case 'UPDATE_ORG_STATUS': {
      state.orgStatus = action.payload;
      return;
    }
    case 'RESET_ORGANIZATION_INFO': {
      state.firstStep.organizationInfo = initialStateValue.firstStep.organizationInfo;
      return;
    }
    case 'ADD_ORGANIZATION_INFO': {
      state.firstStep.organizationInfo = { ...action.payload };
      return;
    }
    case 'ADD_CLIENT_STATUS': {
      state.clientStatus = action.payload;
      return;
    }
    case 'ADD_CLIENT_NAME': {
      state.firstStep.clientEnglishName = action.payload;
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
